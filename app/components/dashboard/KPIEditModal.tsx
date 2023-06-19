import Modal from "../Modal"
import { useState } from "react"
import type { ChangeEvent} from "react";
import { KPI_ENTER_VALUE_STEP, KPI_SET_TYPE_STEP } from "~/constants/data"

interface Props {
  editItem: any
  setEditItem: any
  handleUpdateKPI: any
}

export default function KPIEditModal(props: Props) {

  const { editItem, setEditItem, handleUpdateKPI } = props
  const [step, setStep] = useState<number>(KPI_ENTER_VALUE_STEP)
  const [option, setOption] = useState<string>('update')
  const [sessionName, setSessionName] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)

  const handleCloseUpdateModal = () => {
    setEditItem(null)
    setOption('update')
    setSessionName('')
    setStep(KPI_ENTER_VALUE_STEP)
  }

  const handleChangeKPI = (e: ChangeEvent<HTMLInputElement>) => {
    setEditItem({
      ...editItem,
      value: Number(e.target.value)
    })
  }

  const handleSelectOption = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value)
  }

  const handleSubmit = async () => {
    setSaving(true)
    await handleUpdateKPI(option === 'create', sessionName)
    setSaving(false)
    setEditItem(null)
    setOption('update')
    setSessionName('')
    setStep(KPI_ENTER_VALUE_STEP)
  }

  return (
    <Modal
      title="Change KPI"
      open={editItem !== null}
      onClose={handleCloseUpdateModal}
      footer={
        <div className="text-right">
          {step === KPI_ENTER_VALUE_STEP ? (
            <button className="bg-gray-700 text-xs sm:text-sm px-4 py-2 rounded text-white" onClick={() => setStep(KPI_SET_TYPE_STEP)}>
              Next
            </button>
          ) : (
            <button className="bg-gray-700 text-xs sm:text-sm px-4 py-2 rounded text-white" onClick={handleSubmit}>
              {saving ? 'Saving...' : 'Update'}
            </button>
          )}
          <button className="bg-gray-200 text-xs sm:text-sm px-4 py-2 rounded ml-3" onClick={handleCloseUpdateModal}>
            Close
          </button>
        </div>
      }
    >
      {!editItem ? null : 
        step === KPI_ENTER_VALUE_STEP ? (
          <div>
            <div className="ml-1 text-sm sm:text-md">{editItem.title}</div>
            <input 
              type="number" 
              className="rounded text-sm sm:text-md border outline-none px-3 py-2 mt-1 w-full focus:border-blue-600 transition" 
              value={editItem?.value ?? ''}
              onChange={handleChangeKPI}
            />
            <div className="text-xs sm:text-sm ml-1">{editItem.description}</div>
          </div>
        ) : (
          <div>
            <div className="ml-1 text-sm sm:text-md">Select your option.</div>
            <div className="mt-3">
              <label className="text-sm flex items-center">
                <input type="radio" className="mr-2" value="update" checked={option === 'update'} onChange={handleSelectOption} />
                Update the current session
              </label>
            </div>
            <div className="mt-1">
              <label className="text-sm flex items-center">
                <input type="radio" className="mr-2" value="create" checked={option === 'create'} onChange={handleSelectOption} />
                Create a new session
              </label>
            </div>
            {option === 'create' && (
              <div className="mt-3">
                <input 
                  type="text" 
                  className="rounded text-sm sm:text-md border outline-none px-3 py-2 mt-1 w-full focus:border-blue-600 transition" 
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                />
              </div>
            )}
          </div>
        )
      }
    </Modal>
  )
}