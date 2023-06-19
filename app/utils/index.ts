import { BUSINESS_STAT_LIST } from "~/constants/data";
import type { StatType, StatsForm } from "~/interfaces";

// Convert business stats to priority list request type
export const formatPriorityRequest = (newBusinessStats: Array<any>) => {
  let kpiData: Array<any> = [];
  let requestData: Record<string, number> = kpiData
    .concat(...newBusinessStats.map((item) => item.kpiList))
    .map((item) => ({
      [item.title]: item.value ?? 0,
    }))
    .reduce((acc, curr: any) => {
      const key = Object.keys(curr)[0];
      return { ...acc, [key]: curr[key] };
    }, {} as Record<string, number>);

  return requestData;
};

// Get business stats to display from stats form
export const getStatsByForm = (statsForm: any) => {
  return BUSINESS_STAT_LIST.map((item) => {
    const newKpiList = item.kpiList.map((kpi) => ({ ...kpi, value: statsForm[kpi.id] }));
    return {
      title: item.title,
      kpiList: newKpiList,
    };
  });
};

// Get form data from business stats
export const getFormFromStats = (businessStats: Array<StatType>): StatsForm => {
  let statsForm: Array<any> = [];
  return statsForm
    .concat(...businessStats.map((item: StatType) => item.kpiList))
    .map((item) => ({
      [item.id]: item.value ?? 0,
    }))
    .reduce((acc, curr: any) => {
      const key = Object.keys(curr)[0];
      return { ...acc, [key]: curr[key] };
    }, {} as StatsForm);
};

// Get the string to display in chatboard from priority list
export const priorityListToString = (result: any) => {
  return (
    "The following is the priority list.\n" +
    [result?.high_constraint, ...(result?.other_constraints ?? [])]
      .map((item: any, index) => `${index + 1}. ${item}`)
      .join("\n")
  );
};

// Date formatter for chat time
export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

// YYYY/mm/dd hh:m:sec
export const getDateString = (m: Date) => {
  var dateString =
    m.getUTCFullYear() + "/" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + m.getUTCDate()).slice(-2) + " " +
    ("0" + m.getUTCHours()).slice(-2) + ":" +
    ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    ("0" + m.getUTCSeconds()).slice(-2);
  return dateString
}

// Scroll to the end when the new chat item added
export const scrollDownToBottom = (elementId: string) => {
  setTimeout(() => {
    const chatElement = document.getElementById(elementId);
    if (chatElement) {
      chatElement.scroll({
        top: chatElement.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, 100);
};
