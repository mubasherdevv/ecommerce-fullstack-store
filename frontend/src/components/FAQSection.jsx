import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 business days within the country. Express shipping is available for 1-2 business days delivery. International orders may take 7-14 business days depending on the destination.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return. Refunds are processed within 5-7 business days after we receive the item.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive an email with a tracking number. You can also track your order by logging into your account and visiting the Order History section.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secured with SSL encryption.',
  },
  {
    question: 'How do I contact customer support?',
    answer: 'Our customer support team is available 24/7 via live chat on our website, email at support@exclusive.com, or phone at 1-800-EXCLUSIVE. We typically respond within 1 hour.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination. You can see exact shipping costs at checkout.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="container-custom py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-5 h-10 bg-primary rounded-sm" />
          <span className="text-sm font-semibold text-primary">Support</span>
        </div>
        <h2 className="section-title mx-auto">Frequently Asked Questions</h2>
        <p className="text-gray-medium mt-2 max-w-lg mx-auto">
          Find answers to common questions about our products, shipping, and services.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-dark pr-4">{faq.question}</span>
              <ChevronDownIcon
                className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-48' : 'max-h-0'
              }`}
            >
              <p className="px-5 pb-5 text-gray-medium text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="text-gray-medium">
          Still have questions?{' '}
          <a href="/contact" className="text-primary font-semibold hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </section>
  );
}
