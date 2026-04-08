export const cibilData = {
  scoreRanges: [
    {
      range: "750 - 900",
      label: "Excellent",
      color: "bg-green-500",
      textColor: "text-green-600",
      approvalChance: "Very High",
      interestRate: "8.5% - 9.5%",
      tips: "You are eligible for the best loan offers and lowest interest rates."
    },
    {
      range: "700 - 749",
      label: "Good",
      color: "bg-emerald-400",
      textColor: "text-emerald-500",
      approvalChance: "High",
      interestRate: "9.6% - 10.5%",
      tips: "You have good chances of approval with competitive interest rates."
    },
    {
      range: "650 - 699",
      label: "Fair",
      color: "bg-yellow-400",
      textColor: "text-yellow-600",
      approvalChance: "Moderate",
      interestRate: "10.6% - 12.0%",
      tips: "Loan approval is possible but interest rates might be slightly higher."
    },
    {
      range: "600 - 649",
      label: "Needs Improvement",
      color: "bg-orange-400",
      textColor: "text-orange-600",
      approvalChance: "Low",
      interestRate: "12.1% - 14.0%",
      tips: "High risk of rejection. Consider improving your score before applying."
    },
    {
      range: "300 - 599",
      label: "Poor",
      color: "bg-red-500",
      textColor: "text-red-600",
      approvalChance: "Very Low",
      interestRate: "14%+",
      tips: "Loan approval is unlikely. Focus on clearing dues and rebuilding credit."
    }
  ],
  loanOptions: [
    {
      id: 'bank',
      name: 'Bank Loans',
      type: 'Secured/Unsecured',
      interestRate: '8.5% - 11%',
      processingTime: '7-14 Days',
      minCibil: 700,
      pros: ['Lowest Interest Rates', 'High Trust'],
      cons: ['Strict Eligibility', 'More Documentation']
    },
    {
      id: 'nbfc',
      name: 'NBFC Loans',
      type: 'Unsecured',
      interestRate: '10.5% - 14%',
      processingTime: '3-5 Days',
      minCibil: 650,
      pros: ['Faster Approval', 'Flexible Criteria'],
      cons: ['Higher Interest Rates']
    },
    {
      id: 'govt',
      name: 'Govt. Schemes',
      type: 'Subsidized',
      interestRate: 'Subsidy Based',
      processingTime: '30-45 Days',
      minCibil: 650,
      pros: ['Subsidies available', 'Lower effective cost'],
      cons: ['Long process', 'Complex paperwork']
    }
  ],
  improvementTips: [
    {
      id: 1,
      title: "Pay Dues on Time",
      desc: "Ensure all EMI and credit card payments are made before the due date. Late payments severely impact your score.",
      icon: "Clock"
    },
    {
      id: 2,
      title: "Maintain Low Credit Utilization",
      desc: "Try to use less than 30% of your credit limit. High utilization suggests credit hunger.",
      icon: "Percent"
    },
    {
      id: 3,
      title: "Avoid Multiple Applications",
      desc: "Don't apply for too many loans at once. Each hard enquiry lowers your score slightly.",
      icon: "FileWarning"
    },
    {
      id: 4,
      title: "Check for Errors",
      desc: "Regularly check your CIBIL report for inaccuracies and dispute them if found.",
      icon: "Search"
    }
  ],
  faqs: [
    {
      q: "What is a good CIBIL score for a solar loan?",
      a: "A score of 750 and above is considered excellent and will get you the best interest rates. Scores between 700-749 are also good."
    },
    {
      q: "Can I get a solar loan with a low CIBIL score?",
      a: "It's difficult but not impossible. NBFCs might lend to scores around 650, but interest rates will be higher. Below 600, approval is very unlikely."
    },
    {
      q: "Does checking my CIBIL score frequently lower it?",
      a: "No, checking your own score is considered a 'soft inquiry' and does not impact your score. Only when lenders check it ('hard inquiry'), it may have a minor impact."
    }
  ]
};