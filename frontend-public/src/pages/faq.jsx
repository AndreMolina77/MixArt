import React from 'react'

const FAQ = () => {
  const faqs = [
    {
      question: "What's the best thing about Switzerland?",
      answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "How do you make holy water?",
      answer: "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "Why do you never see elephants hiding in trees?",
      answer: "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "What do you call someone with no body and no nose?",
      answer: "Nobody knows. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "Why can't you hear a pterodactyl go to the bathroom?",
      answer: "Because the pee is silent. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "Why did the invisible man turn down the job offer?",
      answer: "He couldn't see himself doing it. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat.",
    }
  ]
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 font-[Alexandria] text-[#7A6E6E]">
        <h1 className="text-4xl font-bold mb-4">Frequently asked questions</h1>
        <p className="text-customGray mb-8">
          Have a different question and can't find the answer you're looking for? Reach out to our support team by
          {' '}<a href="mailto:support@example.com"  className="text-[#4d6bfe] hover:text-[#3a56d4] transition-colors duration-200 font-medium">
            sending us an email</a>{' '}and we'll get back to you as soon as we can.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-customGray font-regular mb-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default FAQ