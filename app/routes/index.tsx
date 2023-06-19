// ** React Imports
import { useState, useEffect } from "react"
import { redirect } from "@remix-run/node";

// ** Custom Component Imports
import Spinner from "~/components/Spinner";
import StatsCard from "~/components/dashboard/StatsCard"
import ChatBoard from "~/components/dashboard/ChatBoard"
import KPIEditModal from "~/components/dashboard/KPIEditModal"
import StepWizardModal from "~/components/dashboard/StepWizardModal"
import SessionListModal from "~/components/dashboard/SessionListModal";

// ** React Slider Component Imports
import Slider from 'react-slick';

// ** Constants Imports
import { BUSINESS_STAT_LIST, SLICK_SETTING } from "~/constants/data"

// ** Utils Imports
import { getActionSteps } from "utils/getActionSteps"
import { getPriorityDecision } from "utils/indexStore"
import { 
  saveSession, 
  getSessionData, 
  getSessionList, 
  getAnswerFromBot, 
  updateSessionData 
} from "~/utils/api";
import { 
  dateFormatter, 
  getDateString, 
  getStatsByForm, 
  getFormFromStats, 
  scrollDownToBottom,
  priorityListToString, 
  formatPriorityRequest,
} from "~/utils";

// ** Icons Imports
import { BsBarChart, BsChatSquareDots } from "react-icons/bs";

// ** 3rd party Imports
import { getAuth } from "@clerk/remix/ssr.server";
import { useLoaderData } from "@remix-run/react";

// ** Type Imports
import type { 
  MetaFunction,
  LinksFunction, 
  LoaderFunction 
} from "@remix-run/node"
import type { 
  KPIType, 
  ChatType, 
  StatType, 
  StatsForm, 
  SessionItemType, 
  SessionListType
} from "~/interfaces"

// ** Style Imports
import slickStyle from "slick-carousel/slick/slick.css";
import chatLoaderStyle from "~/styles/chatloader.css"
import slickThemeStyle from "slick-carousel/slick/slick-theme.css";
import progressbarStyle from "react-circular-progressbar/dist/styles.css"

// ** Loader Function
export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    // return redirect("/sign-in?redirect_url=" + args.request.url);
  }

  return { userId };
};

// Style Imports
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: progressbarStyle },
  { rel: 'stylesheet', href: chatLoaderStyle },
  { rel: 'stylesheet', href: slickStyle },
  { rel: 'stylesheet', href: slickThemeStyle }
]

// Set page title
export const meta: MetaFunction = () => {
  return { title: "Dashboard" }
}

const Dashboard = () => {

  // User Id
  const { userId } = useLoaderData();

  // State
  const [tab, setTab] = useState<string>('stats-loading')
  const [editItem, setEditItem] = useState<any>(null)
  const [chatList, setChatList] = useState<Array<ChatType>>([])
  const [statsForm, setStatsForm] = useState<StatsForm>({})
  const [chatLoading, setChatLoading] = useState<boolean>(false)
  const [sessionList, setSessionList] = useState<SessionListType>([])
  const [priorityList, setPriorityList] = useState<any>(null)
  const [businessStats, setBusinessStats] = useState<Array<StatType>>(BUSINESS_STAT_LIST)
  const [currentSession, setCurrentSession] = useState<any>(null)
  const [stepWizardModal, setStepWizardModal] = useState<boolean>(false)
  const [sessionListModal, setSessionListModal] = useState<boolean>(false)


  // Initialize
  useEffect(() => {
    pushMessage(true, "Hello! I am Sherlock. How can I assist you today?")
    async function initialize() {
      const sessions: SessionListType = await getSessionList(userId)
      setSessionList(sessions)
      if (sessions.length > 0) {
        updateCurrentSession(sessions[sessions.length - 1])
      }
    }
    initialize()
  }, [])

  // Show loading when display slick to hidden it for 400ms
  useEffect(() => {
    if(tab === 'stats-loading') {
      setTimeout(() => {
        setTab((prevTab: string) => {
          return prevTab === 'stats-loading' ? 'stats' : prevTab
        })
      }, 400)
    }
  }, [tab])

  // Update the Current Session and get the session data
  const updateCurrentSession = async (pSession: any) => {
    if (!pSession) {
      setCurrentSession(null)
      setBusinessStats(BUSINESS_STAT_LIST)
      return;
    }
    const sessionData: SessionItemType | null = await getSessionData(userId, pSession.sessionId)
    if (sessionData) {
      const { statsData, priorityList, actionSteps }: SessionItemType = sessionData
      setBusinessStats(statsData)
      pushMessage(true, priorityListToString(priorityList))
      pushMessage(true, actionSteps)
    }
    setCurrentSession(pSession)
  }

  // Add new chat item
  const pushMessage = (isIn: boolean, text: string) => {
    setChatList(chatList => ([...chatList, {
      isIn,
      text,
      time: dateFormatter.format(new Date())
    }]))
    scrollDownToBottom("chat_list")
  }

  // Update current business stats
  const updateBusinessStats = async (newStatsForm: any, isNew: boolean, data?: string) => {
    const newBusinessStats = getStatsByForm(newStatsForm)
    setBusinessStats(newBusinessStats)
    setChatLoading(true)
    scrollDownToBottom("chat_list")

    let result: any = {}
    try {
      result = await getPriorityDecision(formatPriorityRequest(newBusinessStats))
      setPriorityList(result)
      setChatLoading(false)
      pushMessage(true, priorityListToString(result))
      pushMessage(true, getActionSteps(result?.high_constraint ?? ''))

      if(isNew) {
        // Save new session
        const newSessionName = data ?? getDateString(new Date())
        const newSessionId = await saveSession(userId, {
          statsData: newBusinessStats,
          priorityList: result,
          actionSteps: getActionSteps(result?.high_constraint ?? '')
        }, newSessionName)
        if(newSessionId) {
          setCurrentSession({
            sessionId: newSessionId,
            sessionName: newSessionName
          })
          setSessionList([
            ...sessionList,
            {
              sessionId: newSessionId,
              sessionName: newSessionName
            }
          ])
        }        
      } else {
        // Update current session
        await updateSessionData(userId, currentSession.sessionId, {
          statsData: newBusinessStats,
          priorityList: result,
          actionSteps: getActionSteps(result?.high_constraint ?? '')
        })
      }
    } catch(e: any) {
      setChatLoading(false)
      pushMessage(true, e.toString())
    }
  }

  // Update one KPI item
  const handleUpdateKPI = async (isNew: boolean, sessionName?: string) => {
    let newStatsForm = getFormFromStats(businessStats)
    newStatsForm[editItem.id] = editItem.value
    setStatsForm(newStatsForm)
    await updateBusinessStats(newStatsForm, isNew, sessionName)
  }

  // Send new message and get the answer
  const handleSendMessage = async (chat: string) => {
    pushMessage(false, chat)
    setChatLoading(true)
    scrollDownToBottom("chat_list")
    const answer = await getAnswerFromBot(chat, priorityList)
    setChatLoading(false)
    pushMessage(true, answer)
  }

  // Open SessionList modal
  const handleSessionListOpen = () => {
    setSessionListModal(true)
    getSessionList(userId)
  }

  // Close Step Wizard
  const handleCloseStepWizard = () => {
    setStepWizardModal(false)
    setStatsForm({})
  }

  return (    
    <div className="text-center my-14">
      <h1 className="text-3xl font-bold">Sherlock Constraint Finder</h1>
      <div className="text-xl mt-8">Fill out each statistic below then start chatting with Sherlock</div>
      <div className="grid grid-cols-2 mt-8 mx-3 sm:mx-0">
        <button className="bg-gray-700 mr-2 sm:ml-auto max-w-[300px] active:bg-gray-800 text-white rounded py-2 px-8" onClick={handleSessionListOpen}>
          Toggle Session
        </button>
        <button className="bg-gray-700 ml-2 sm:mr-auto max-w-[300px] active:bg-gray-800 text-white rounded py-2 px-8" onClick={() => setStepWizardModal(true)}>
          Collect Data
        </button>
      </div>
      <div className="mx-auto max-w-[1500px]">
        <div className="mx-3 mt-8 grid grid-cols-2 sm:hidden">
          <div className={`mr-2 rounded cursor-pointer py-3 ${tab.startsWith('stats') ? 'bg-gray-700 text-white' : 'bg-gray-200'}`} onClick={() => setTab("stats-loading")}>
            <BsBarChart size={17} className="mx-auto" />
          </div>
          <div className={`ml-2 rounded cursor-pointer py-3 ${tab === 'chat' ? 'bg-gray-700 text-white' : 'bg-gray-200'}`} onClick={() => setTab("chat")}>
            <BsChatSquareDots size={17} className="mx-auto" />
          </div>
        </div>
        <div className={`slider-wrapper max-h-[600px] overflow-y-hidden relative rounded-md sm:rounded-b-none mt-3 ${tab.startsWith('stats') ? 'block' : 'hidden'} sm:block sm:mb-0`}>
          <Slider {...SLICK_SETTING}>
            {businessStats.map((item: StatType, index) => (
              <StatsCard 
                key={index} 
                data={item} 
                onOpenModal={(e: KPIType) => setEditItem(e)} 
              />
            ))}
          </Slider>
          <div className={`absolute left-0 right-0 top-0 bottom-0 bg-gray-100 sm:hidden rounded-md flex items-center justify-center ${tab === 'stats-loading' ? 'block' : 'hidden'}`}>
            <Spinner />
          </div>
        </div>
        <div className={`mx-3 mt-3 sm:mt-0 ${tab === 'chat' ? 'block' : 'hidden'} sm:block`}>
          <ChatBoard 
            chatList={chatList}
            chatLoading={chatLoading}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
      <KPIEditModal
        editItem={editItem}
        setEditItem={setEditItem}
        handleUpdateKPI={handleUpdateKPI}
      />
      <SessionListModal
        open={sessionListModal}
        userId={userId}
        onClose={() => setSessionListModal(false)}
        sessionList={sessionList}
        setSessionList={setSessionList}
        currentSession={currentSession}
        updateCurrentSession={updateCurrentSession}
      />
      <StepWizardModal 
        businessStats={businessStats}
        statsForm={statsForm}
        open={stepWizardModal}
        onClose={handleCloseStepWizard}
        setStatsForm={setStatsForm}
        updateBusinessStats={updateBusinessStats}
      />
    </div>
  )
}

export default Dashboard
