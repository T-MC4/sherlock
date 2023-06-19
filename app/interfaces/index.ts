export interface KPIType {
    id: string;
    icon: string;
    title: string;
    description: string;
    value?: number;
    unit?: string;
}

export interface StatType {
    title: string;
    kpiList: Array<KPIType>
}

export interface ChatType {
    isIn: boolean;
    text: string | Element;
    time?: string;
}

export interface StatsForm {
    [key: string]: number;
}

export interface SessionListType extends Array<{
    sessionId: string;
    sessionName: string;
}> {}

export interface SessionItemType {
    statsData: Array<StatType>;
    priorityList: any;
}
