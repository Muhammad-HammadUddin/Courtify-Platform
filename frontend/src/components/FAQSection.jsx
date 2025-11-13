

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function FAQSection() {
  return (
    <section className="w-full  bg-black text-white px-4 ">
      <h2 className="text-3xl font-bold text-center mb-4 text-blue-400">Frequently Asked Questions</h2>
      <p className="text-gray-200 text-center mb-6 mt-4">
        Quick answers to common questions about bookings, cancellations, and policies.
      </p>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger>How do I book a court?</AccordionTrigger>
          <AccordionContent>
            Browse available courts, pick your date and time, and confirm your booking.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger>Can I cancel or reschedule?</AccordionTrigger>
          <AccordionContent>
            Yes — free changes up to 12 hours before your slot. Inside 12 hours, small fees may apply.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3">
          <AccordionTrigger>Do you offer memberships?</AccordionTrigger>
          <AccordionContent>
            We offer flexible passes and monthly memberships with discounts and priority bookings.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q4">
          <AccordionTrigger>What equipment is provided?</AccordionTrigger>
          <AccordionContent>
            Goals and markings are provided; balls and bibs can be rented at the front desk.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
