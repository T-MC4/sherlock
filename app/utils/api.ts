import newAxios from 'axios'
import { getActionSteps } from 'utils/getActionSteps'
import { getAnswer, getContextFromIndex, getIndexName } from 'utils/indexStore'
import type { SessionItemType, SessionListType } from '~/interfaces'

const axios = newAxios.create({
    baseURL: 'https://sherlock-inmemorysearch-production.up.railway.app'
});

export const getSessionList = async (userId: string): Promise<SessionListType> => {
    try {
        const response = await axios.get(`/api/session/${userId}`)
        const {success, items, message}: any = response.data
        if (success) {
            return items
        } else {
            console.log('>>>getSessionList', message)
            return []
        }
    } catch(err) {
        console.log('>>>getSessionList', err)
        return []
    }
}

export const getSessionData = async(userId: string, sessionId: string): Promise<SessionItemType | null> => {
    try {
        const response = await axios.get(`/api/session/${userId}/${sessionId}`)
        const {success, data, message}: any = response.data
        if (success) {
            return data
        } else {
            console.log('>>>getSessionData', message)
            return null
        }
    } catch(err) {
        console.log('>>>getSessionData', err)
        return null
    }
}

export const saveSession = async(userId: string, data: SessionItemType, sessionName?: string): Promise<string | null> => {
    try {
        const response = await axios.post(`/api/session/${userId}`, { data, sessionName })
        const {success, message, sessionId}: any = response.data
        if (success) {
            return sessionId
        } else {
            console.log('>>>saveSession', message)
            return null
        }
    } catch(err) {
        console.log('>>>saveSession', err)
        return null
    }
}

export const updateSessionData = async(userId: string, sessionId: string, data: SessionItemType): Promise<boolean> => {
    try {
        const response = await axios.put(`/api/session/${userId}/${sessionId}`, { data })
        const {success, message}: any = response.data
        if (success) {
            return true
        } else {
            console.log('>>>updateSessionData', message)
            return false
        }
    } catch(err) {
        console.log('>>>updateSessionData', err)
        return false
    }
}

export const updateSessionName = async(userId: string, sessionId: string, sessionName: string): Promise<boolean> => {
    try {
        const response = await axios.put(`/api/session/${userId}/${sessionId}/name`, { sessionName })
        const {success, message}: any = response.data
        if (success) {
            return true
        } else {
            console.log('>>>updateSessionName', message)
            return false
        }
    } catch(err) {
        console.log('>>>updateSessionName', err)
        return false
    }
}

export const deleteSession = async(userId: string, sessionId: string): Promise<boolean> => {
    try {
        const response = await axios.delete(`/api/session/${userId}/${sessionId}`)
        const {success, message}: any = response.data
        if (success) {
            return true
        } else {
            console.log('>>>deleteSession', message)
            return false
        }
    } catch(err) {
        console.log('>>>deleteSession', err)
        return false
    }
}

export const getAnswerFromBot = async (question: string, priorityList: any) => {
    try {
        const indexName = await getIndexName(question)
        const context = await getContextFromIndex(question, indexName ?? '')
        const answer = await getAnswer(
            context ?? [], 
            question, 
            priorityList?.high_constraint ?? '', 
            getActionSteps(priorityList?.high_constraint ?? '')
        )
        return answer?.trim() ?? '😊😊😊'
    } catch(error) {
        return '😊😊😊'
    }
}