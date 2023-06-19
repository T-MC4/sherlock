import { SessionListType } from "~/interfaces";

export const BUSINESS_STAT_LIST = [
  {
    title: "Organic Marketing",
    kpiList: [
      {
        id: "contactedLeads",
        icon: "BsPerson",
        title: "Contacted Leads",
        description: "How many leads did you contact",
      },
      {
        id: "responses",
        icon: "BsEnvelope",
        title: "Responses",
        description: "How many responses did you get",
      },
      {
        id: "apptsSet",
        icon: "BsPencil",
        title: "Appts Set",
        description: "How many appointments did you set",
      },
    ]
  },
  {
    title: "Paid Ads",
    kpiList: [
      {
        id: "cpm",
        icon: "BsEye",
        title: "CPM",
        description: "What was your cost per thousand impressions",
      },
      {
        id: "ctr",
        icon: "BsMouse2",
        title: "CTR",
        description: "What's your click through rate",
        unit: '%'
      },
      {
        id: "optInRate",
        icon: "BsDoorClosed",
        title: "Opt-in Rate",
        description: "This rate all which heads opt-in",
        unit: '%'
      },
      {
        id: "adSpend",
        icon: "BsUbuntu",
        title: "Ad Spend",
        description: "How many do you spend on ads",
      },
      {
        id: "leads",
        icon: "BsUniversalAccess",
        title: "Leads",
        description: "The number of leads you got",
      },
    ]
  },
  {
    title: "Appointment Setting",
    kpiList: [
      {
        id: "dials",
        icon: "BsPhoneVibrate",
        title: "Dials",
        description: "How many dials did you make",
      },
      {
        id: "pickups",
        icon: "BsTelephoneInbound",
        title: "Pickups",
        description: "How many people picked up",
      },
      {
        id: "sets",
        icon: "BsCheckLg",
        title: "Sets",
        description: "How many appointments did you set",
      },
      {
        id: "dqs",
        icon: "BsSlashCircle",
        title: "DQ's",
        description: "How many DQ's did you get",
      },
    ]
  },
  {
    title: "Closing",
    kpiList: [
      {
        id: "shows",
        icon: "BsGraphUp",
        title: "Shows",
        description: "How many shows did you have",
      },
      {
        id: "closes",
        icon: "BsLock",
        title: "Closes",
        description: "How many people did you close"
      },
      {
        id: "pifs",
        icon: "BsCurrencyDollar",
        title: "PIF's",
        description: "How many people paid in full",
        unit: "$"
      },
      {
        id: "payPlan",
        icon: "BsCurrencyDollar",
        title: "Pay Plan",
        description: "How many people did you put on a pay plan",
        unit: "$"
      },
      {
        id: "cash",
        icon: "BsCurrencyDollar",
        title: "Cash",
        description: "How much cash did you collect",
        unit: "$"
      },
    ]
  }
]

export const FONT_SIZE_BREAKPOINTS = [
  {
    name: 'text-xs',
    size: 12
  },
  {
    name: 'text-sm',
    size: 14
  },
  {
    name: 'text-base',
    size: 16
  },
  {
    name: 'text-lg',
    size: 18
  }
]

export const SLICK_SETTING = {
  autoplay: false,
  dots: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1150,
      settings: { slidesToShow: 3}
    },
    {
      breakpoint: 876,
      settings: { slidesToShow: 2}
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1}
    }
  ]
};

export const KPI_ENTER_VALUE_STEP = 0
export const KPI_SET_TYPE_STEP = 1