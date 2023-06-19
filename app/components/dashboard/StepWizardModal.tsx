// ** React Import
import { useState } from "react"

// ** Component Imports
import Modal from "../Modal"
import { Steps, useSteps } from "react-step-builder"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import { BsArrowLeft, BsArrowRight, BsCheckLg, BsUiRadios } from "react-icons/bs"

// ** Constant Import
import { BUSINESS_STAT_LIST } from "~/constants/data"

// ** Type Imports
import type { ChangeEvent } from "react"
import type { KPIType, StatType, StatsForm } from "~/interfaces"

interface Props {
  businessStats: Array<StatType>;
  statsForm: StatsForm;
  setStatsForm: any;
  updateBusinessStats: any;
  open: boolean;
  onClose: any;
}

export default function StepWizardModal(props: Props) {
  
  // Props
  const { businessStats, statsForm, setStatsForm, updateBusinessStats, open, onClose } = props
  
  // Step builder hook
  const { prev, next, progress, current, hasPrev, hasNext, isLast } = useSteps()

  // State
  const [saving, setSaving] = useState<boolean>(false)
  const [sessionName, setSessionName] = useState<string>('')
  const [requiredFields, setRequiredFields] = useState<Array<string>>([])

  const handleNext = () => {
    setRequiredFields([])
    const formIds: Array<string> = BUSINESS_STAT_LIST[current - 1].kpiList.map(item => item.id)
    const errorFields = formIds.filter((id: string) => isNaN(statsForm[id]))
    if (errorFields.length === 0){
      next()
    } else {
      setRequiredFields(errorFields)
    }
  }

  const handleChangeStatsForm = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setStatsForm({
      ...statsForm, 
      [id]: Number(e.target.value)
    })
  }

  const handleSubmit = async () => {
    setSaving(true)
    await updateBusinessStats(
      statsForm, 
      true, 
      sessionName !== '' ? sessionName : null
    )
    setSaving(false)
    onClose()
  }

  return (
    <Modal
      title="Session List"
      open={open}
      onClose={onClose}
    >
      <div className="mx-auto text-left mt-8 text-gray-700">
        <div className="flex items-center mb-8">
          <h1 className="bg-blue-600 text-white rounded py-2 px-4 cursor-pointer text-lg shadow-lg flex items-center mr-3">
            <BsUiRadios className="mr-3" />{isLast ? 'Final Step' : businessStats[current - 1].title}
          </h1>
          <div className="w-[80px] h-[80px] ml-auto">
            <CircularProgressbarWithChildren 
              value={progress * 100}
              styles={{
                path: { 
                  stroke: `rgba(37,99,255,0.8)`,
                }
              }}
            >
              {isLast ? (
                <BsCheckLg size={30} className="text-blue-600" />
              ) : (
                <span className="text-3xl text-blue-600 fond-bold">{current}</span>
              )}
            </CircularProgressbarWithChildren>
          </div>
        </div>
        <Steps>
          {[
            ...businessStats.map((item: StatType, index) => (
              <div key={index} className="grid grid-cols-1 gap-4">
                {item.kpiList.map((kpiItem: KPIType, kpiIndex) => (
                  <div className="" key={kpiIndex}>
                    <div className="ml-1 text-[15px] font-bold">
                      {kpiItem.title}
                      {kpiItem.unit ? ` (${kpiItem.unit})` : ''}
                    </div>
                    <input
                      type="number" 
                      className={`rounded border text-sm ${
                        requiredFields.indexOf(kpiItem.id) > -1 ? 'border-red-400' : 'focus:border-blue-600'
                      } outline-none px-3 py-2 mt-1 w-full transition`}
                      value={statsForm[kpiItem.id] ?? ''}
                      onChange={handleChangeStatsForm(kpiItem.id)}
                      placeholder={kpiItem.description}
                    />
                  </div>
                  ))
                }
              </div>
            )),
            <div key={businessStats.length} className="text-center">
              <div className="text-xl leading-10 py-8">
                Well done! <br/> You have successfully configured everything.
              </div>
              <input
                type="text" 
                className="rounded max-w-[400px] border text-sm focus:border-blue-600 outline-none px-3 py-2 w-full transition mt-5"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                placeholder="Enter your session name"
              />
            </div>
          ]}
        </Steps>
        <div className="mt-12 flex">
          {hasPrev && (
            <button onClick={prev} className="bg-gray-700 text-sm px-4 py-2 rounded text-white">
              <span className="flex items-center"><BsArrowLeft className="mr-3" /> Prev</span>
            </button>
          )}
          {hasNext ? (
            <button onClick={handleNext} className="bg-gray-700 text-sm px-4 py-2 rounded text-white ml-auto">
              <span className="flex items-center">Next <BsArrowRight className="ml-3" /></span>
            </button>
          ) : (
            <button onClick={handleSubmit} className="bg-gray-700 text-sm px-4 py-2 rounded text-white ml-auto">
              {saving ? 'Saving...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}