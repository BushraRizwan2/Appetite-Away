
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../../constants';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200 dark:border-slate-700 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
            >
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{question}</h4>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {ICONS.chevronDown}
                </span>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="pt-4 text-slate-600 dark:text-slate-400 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FaqSection: React.FC = () => {
    return (
        <section className="bg-white dark:bg-slate-800 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 !mb-4">Order food and groceries online from the best restaurants and shops on <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link></h2>
                    <p>
                        Are you hungry? Did you have a long and stressful day? Interested in getting a cheesy pizza delivered to your office or looking to avoid the weekly shop? Then <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> Pakistan is the right destination for you! <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> offers you a long and detailed list of the best restaurants and shops near you to help make your every day easier.
                    </p>

                    <h3>What's new?</h3>
                    <ul>
                        <li>Wide variety of restaurants and shops, an abundance of cuisines & products.</li>
                        <li>High quality delivery service.</li>
                        <li>Live chat feature to give App users instant help when they need it.</li>
                        <li>NEW: <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> grocery delivery! Discover the best shops, pharmacies, bakeries and more near you.</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 !mt-12 !mb-6">Frequently Asked Questions</h2>
                </div>
                
                <div>
                    <FaqItem question="How can I get Appetite Away delivery?">
                        <p>To get <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> delivery, simply locate the restaurants and shops near you by typing in your address, browse through a variety of restaurants and cuisines, check menus and prices, choose your dishes and add them to the basket. Now you only need to checkout and make the payment. Soon your delicious food will arrive at your doorstep!</p>
                    </FaqItem>
                    <FaqItem question="Which takeout restaurants open now near me?">
                        <p>You can check which takeout restaurants are open now near you by simply typing your address in the location bar on <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> and pressing search. You will see all the available restaurants and shops that deliver to your area.</p>
                    </FaqItem>
                    <FaqItem question="Does Appetite Away deliver 24 hours?">
                        <p>Yes, <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> in Pakistan delivers 24 hours. However, many restaurants may be unavailable for a late-night delivery. Please check which places in Pakistan deliver to you within 24 hours by using your address. You can also order groceries 24 hours a day via our grocery service.</p>
                    </FaqItem>
                    <FaqItem question="Can you pay cash for Appetite Away?">
                        <p>Yes, you can pay cash on delivery for <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> in Pakistan.</p>
                    </FaqItem>
                    <FaqItem question="How can I pay Appetite Away online?">
                        <p>You can pay online while ordering at <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> Pakistan by using a credit or debit card or PayPal.</p>
                    </FaqItem>
                    <FaqItem question="Can I order Appetite Away for someone else?">
                        <p>Yes, <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> Pakistan allows you to place an order for someone else. During checkout, just update the name and delivery address of the person you're ordering for. Please keep in mind that if the delivery details are not correct and the order cannot be delivered, we won't be able to process a refund.</p>
                    </FaqItem>
                    <FaqItem question="How much does Appetite Away charge for delivery?">
                        <p>Delivery fee charged by <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> in Pakistan depends on many operational factors, most of all - location and the restaurant you are ordering from. You can always check the delivery fee while forming your order. Besides, you can filter the restaurants by clicking on the "Free Delivery" icon at the top of your restaurant listing.</p>
                    </FaqItem>
                    <FaqItem question="What restaurants let you order online?">
                        <p>There are hundreds of restaurants on <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> Pakistan that let you order online. For example, KFC, McDonald's, Pizza Hut, OPTP, Hardee's, Domino's, Kababjees and many-many more! In order to check all the restaurants near you that deliver, just type in your address and discover all the available places.</p>
                    </FaqItem>
                    <FaqItem question="Does Appetite Away have minimum order?">
                        <p>Yes, many restaurants have a minimum order. The minimum order value depends on the restaurant you order from and is indicated during your ordering process.</p>
                    </FaqItem>
                    <FaqItem question="What is the difference between delivery and Pick-Up?">
                        <p>If you choose delivery, an <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> rider will collect your order from the restaurant and take it to your chosen delivery address. If you choose Pick-Up, you can takeaway your food directly from the restaurant for extra savings – and to jump to the front of the queue. Pick-Up orders are available for restaurants only.</p>
                    </FaqItem>
                </div>

                <p className="mt-12 text-center text-lg text-slate-700 dark:text-slate-300">
                    Order food and groceries online with <Link to="/" className="text-rose-500 hover:underline">Appetite Away</Link> now and enjoy a great dining experience!
                </p>
            </div>
        </section>
    );
};

export default FaqSection;
