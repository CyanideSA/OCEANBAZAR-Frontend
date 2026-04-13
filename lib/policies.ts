export type PolicyLocale = 'en' | 'bn';

export type PolicyKey =
  | 'privacy'
  | 'returns'
  | 'refunds'
  | 'shipping'
  | 'terms'
  | 'warranty';

export type SectionIcon =
  | 'shield' | 'check' | 'clock' | 'alert' | 'info' | 'truck'
  | 'package' | 'credit' | 'ban' | 'file' | 'scale' | 'lock'
  | 'refresh' | 'star' | 'list' | 'user' | 'mail';

export interface PolicySection {
  heading: string;
  body: string;
  icon?: SectionIcon;
  highlight?: string;
  bullets?: string[];
  tag?: 'eligibility' | 'process' | 'timeline' | 'conditions' | 'info';
}

export interface PolicyDocument {
  title: string;
  intro: string;
  lastUpdated?: string;
  sections: PolicySection[];
}

const EN_POLICIES: Record<PolicyKey, PolicyDocument> = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'April 2025',
    intro:
      'Ocean Bazar collects only the minimum information needed to process orders, improve service, and keep your account secure. We do not sell or rent your personal data.',
    sections: [
      {
        icon: 'list',
        tag: 'info',
        heading: 'Information we collect',
        body: 'We collect only what is necessary to deliver our service.',
        bullets: [
          'Name, phone number, and email address for account and communication',
          'Delivery address for order fulfillment',
          'Order history and browsing activity for personalization',
          'Payment metadata (we never store full card numbers)',
          'Device and browser info for security and fraud prevention',
        ],
      },
      {
        icon: 'shield',
        tag: 'info',
        heading: 'How we use your information',
        body: 'Your data is used strictly to run and improve the platform.',
        bullets: [
          'Process and fulfill your orders',
          'Send order status notifications and receipts',
          'Provide customer support and resolve disputes',
          'Detect and prevent fraudulent activity',
          'Improve product recommendations and platform features',
        ],
      },
      {
        icon: 'lock',
        tag: 'conditions',
        heading: 'Data protection',
        body:
          'We use industry-standard encryption (TLS) for data in transit and apply strict access controls internally. Only authorized personnel can access customer data, and only when required.',
        highlight: 'We do not sell, rent, or share your personal data with third parties for marketing purposes.',
      },
      {
        icon: 'user',
        tag: 'info',
        heading: 'Third-party services',
        body: 'Certain trusted partners may process limited data to fulfil their specific role.',
        bullets: [
          'Payment gateways (bKash, Nagad, SSLCommerz) — for transaction processing only',
          'Courier partners — for delivery fulfillment',
          'Analytics tools — anonymized usage data only',
        ],
      },
      {
        icon: 'mail',
        tag: 'process',
        heading: 'Your rights',
        body: 'You may request access to, correction of, or deletion of your personal data at any time by contacting support. Account deletion requests are processed within 7 business days.',
      },
    ],
  },

  returns: {
    title: 'Return Policy',
    lastUpdated: 'April 2025',
    intro:
      'Eligible items may be returned within the approved return window. Returns are subject to product condition, category rules, and verification by our team.',
    sections: [
      {
        icon: 'check',
        tag: 'eligibility',
        heading: 'Return eligibility',
        body: 'To qualify for a return, all of the following must apply:',
        bullets: [
          'Return request raised within 7 days of confirmed delivery',
          'Product is unused and in original, undamaged condition',
          'All original packaging, tags, accessories, and manuals are included',
          'Proof of purchase (order ID) is provided',
          'Product is not listed under non-returnable categories',
        ],
        highlight: 'The return window is 7 days from the delivery date shown in your order timeline.',
      },
      {
        icon: 'ban',
        tag: 'conditions',
        heading: 'Non-returnable items',
        body: 'The following product types are not eligible for return regardless of condition:',
        bullets: [
          'Perishable goods and food items',
          'Personal care, hygiene, and intimate products',
          'Digital goods, software, and vouchers',
          'Custom or personalised items',
          'Products marked "Final Sale" or "Non-returnable" on the listing',
          'Items damaged by the customer after delivery',
        ],
      },
      {
        icon: 'package',
        tag: 'process',
        heading: 'How to initiate a return',
        body: 'Follow these steps to start a return:',
        bullets: [
          'Go to My Orders and select the order containing the item',
          'Tap "Return / Dispute" and choose the item and reason',
          'Upload photos if the item is damaged or incorrect',
          'Submit — our team will review within 1–2 business days',
          'Once approved, you will receive pickup or drop-off instructions',
        ],
      },
      {
        icon: 'clock',
        tag: 'timeline',
        heading: 'Return timelines',
        body: 'After initiating a return request, here is what to expect:',
        bullets: [
          'Review decision: 1–2 business days',
          'Pickup / drop-off arrangement: 1–3 business days after approval',
          'Item inspection after receipt: up to 2 business days',
          'Refund initiation after inspection pass: 1–3 business days',
        ],
      },
      {
        icon: 'alert',
        tag: 'conditions',
        heading: 'Condition check',
        body:
          'All returned items are inspected before final approval. Returns may be rejected if the product shows signs of use, tampering, missing parts, or damage not reported at time of filing.',
        highlight: 'If a return is rejected after inspection, the item will be shipped back to you at no additional cost.',
      },
    ],
  },

  refunds: {
    title: 'Refund Policy',
    lastUpdated: 'April 2025',
    intro:
      'Approved refunds are processed to the original payment method after order verification. Timelines vary by payment method and case type.',
    sections: [
      {
        icon: 'check',
        tag: 'eligibility',
        heading: 'When refunds are approved',
        body: 'Refunds are issued in the following cases:',
        bullets: [
          'Order cancelled before dispatch',
          'Item not delivered within the maximum estimated window',
          'Item received is damaged, defective, or materially different from listing',
          'Return request approved and item passes inspection',
          'Duplicate or erroneous charge confirmed by our team',
        ],
      },
      {
        icon: 'clock',
        tag: 'timeline',
        heading: 'Refund timelines by payment method',
        body: 'Processing time after approval:',
        bullets: [
          'bKash / Nagad / Rocket / Upay — within 3 business days',
          'SSLCommerz (card/internet banking) — 5–10 business days depending on issuing bank',
          'OB Points (if used) — restored within 24 hours',
          'Cash on Delivery — refund via mobile wallet within 3 business days',
        ],
        highlight: 'All timelines start from the date our team marks the refund as approved, not from when you submit the request.',
      },
      {
        icon: 'scale',
        tag: 'conditions',
        heading: 'Partial refunds',
        body: 'A partial refund may be issued when:',
        bullets: [
          'Only part of a multi-item order is returned',
          'An item passes partial inspection (e.g. accessory missing)',
          'Delivery fee was already incurred and is non-refundable in that case',
          'A promotional discount applied only to part of the order',
        ],
      },
      {
        icon: 'alert',
        tag: 'process',
        heading: 'Failed or delayed refunds',
        body:
          'If your refund does not arrive within the stated window, first check your payment provider app or bank statement. If still missing, open a support ticket with your order number and payment method. Our team will trace and escalate within 2 business days.',
        highlight: 'Always include your Order ID when contacting support about a refund.',
      },
      {
        icon: 'info',
        tag: 'conditions',
        heading: 'Non-refundable amounts',
        body: 'The following are generally not refunded:',
        bullets: [
          'Service fees on successfully processed orders',
          'Shipping fees on orders where delivery was completed',
          'OB Points bonus redemptions (reversed, not cash-refunded)',
        ],
      },
    ],
  },

  shipping: {
    title: 'Shipping Policy',
    lastUpdated: 'April 2025',
    intro:
      'Ocean Bazar delivers across all 64 districts of Bangladesh. Delivery time and cost depend on your location, product type, and courier availability.',
    sections: [
      {
        icon: 'truck',
        tag: 'info',
        heading: 'Delivery coverage',
        body: 'We partner with trusted couriers to reach:',
        bullets: [
          'All major cities — Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barisal, Rangpur, Mymensingh',
          'All 64 districts nationwide',
          'Remote and upazila-level destinations (may take longer)',
        ],
        highlight: 'Some areas may have limited payment or delivery options due to courier coverage.',
      },
      {
        icon: 'clock',
        tag: 'timeline',
        heading: 'Estimated delivery timelines',
        body: 'After order dispatch:',
        bullets: [
          'Dhaka metro area — 1–2 business days',
          'Other major cities — 2–3 business days',
          'District towns and rural areas — 3–5 business days',
          'Remote or hard-to-reach zones — up to 7 business days',
        ],
      },
      {
        icon: 'credit',
        tag: 'conditions',
        heading: 'Shipping charges',
        body:
          'Shipping fees are calculated at checkout based on your location, order weight, and any active promotions. Some orders qualify for free or subsidised shipping.',
        bullets: [
          'Standard shipping: ৳25–৳80 depending on zone',
          'Free shipping thresholds may apply during campaigns',
          'Bulky or fragile items may incur additional handling fees',
        ],
      },
      {
        icon: 'alert',
        tag: 'conditions',
        heading: 'Delivery attempts',
        body:
          'Couriers will attempt delivery at the address and phone number provided. Please ensure you are reachable.',
        bullets: [
          'Up to 2 delivery attempts are made before return to warehouse',
          'Failed delivery due to wrong address or unavailability may require re-dispatch fees',
          'COD orders that are refused on delivery may result in account restrictions',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'April 2025',
    intro:
      'By accessing or using Ocean Bazar, you agree to abide by these terms. Please read them carefully. These terms govern all transactions, account use, and platform interactions.',
    sections: [
      {
        icon: 'user',
        tag: 'conditions',
        heading: 'Account responsibility',
        body: 'You are responsible for all activity on your account.',
        bullets: [
          'Keep your login credentials confidential',
          'Provide accurate name, contact, and address information',
          'Notify us immediately of any unauthorized account access',
          'One account per person — duplicate accounts may be merged or removed',
        ],
      },
      {
        icon: 'credit',
        tag: 'conditions',
        heading: 'Pricing and availability',
        body:
          'All prices are in Bangladeshi Taka (BDT) and include applicable taxes unless stated otherwise.',
        bullets: [
          'Prices may change without prior notice',
          'Promotions and discounts are time-limited and subject to stock',
          'We reserve the right to correct pricing errors before dispatch',
          'Out-of-stock items may be cancelled with a full refund',
        ],
        highlight: 'An order confirmation email is not a guarantee of acceptance — see Order Acceptance below.',
      },
      {
        icon: 'file',
        tag: 'process',
        heading: 'Order acceptance',
        body:
          'Placing an order is an offer to purchase, not a confirmed sale. We reserve the right to reject or cancel orders in the following situations:',
        bullets: [
          'Suspected fraud or account abuse',
          'Pricing error or stock discrepancy discovered after placement',
          'Payment not verified within the required window',
          'Address or identity cannot be verified for high-value orders',
        ],
      },
      {
        icon: 'ban',
        tag: 'conditions',
        heading: 'Prohibited conduct',
        body: 'The following actions are strictly prohibited and may result in permanent account suspension:',
        bullets: [
          'Creating fake accounts or impersonating others',
          'Abusing promotions, coupons, or referral programs',
          'Making fraudulent return or refund claims',
          'Attempting to manipulate reviews or ratings',
          'Reverse-engineering, scraping, or attacking platform systems',
        ],
      },
      {
        icon: 'scale',
        tag: 'conditions',
        heading: 'Dispute resolution',
        body:
          'All disputes should be raised through the official support ticket system. Ocean Bazar will mediate in good faith. Unresolved disputes are subject to Bangladeshi law and jurisdiction of Dhaka courts.',
      },
      {
        icon: 'info',
        tag: 'conditions',
        heading: 'Limitation of liability',
        body:
          'Ocean Bazar is not liable for indirect, incidental, or consequential damages arising from use of the platform, to the maximum extent permitted by applicable law. Our total liability for any claim is limited to the value of the affected order.',
      },
      {
        icon: 'refresh',
        tag: 'info',
        heading: 'Changes to these terms',
        body:
          'We may update these terms at any time. Continued use of the platform after changes constitutes acceptance. Significant changes will be communicated via email or in-app notification.',
      },
    ],
  },

  warranty: {
    title: 'Warranty Policy',
    lastUpdated: 'April 2025',
    intro:
      'Warranty coverage depends on the product brand, seller commitment, and applicable manufacturer terms. Always check the product listing for specific warranty information.',
    sections: [
      {
        icon: 'star',
        tag: 'eligibility',
        heading: 'Types of warranty',
        body: 'Products on Ocean Bazar may carry one or more of the following warranty types:',
        bullets: [
          'Brand / manufacturer warranty — serviced at brand service centers',
          'Seller warranty — replacement or repair handled by the seller',
          'Ocean Bazar platform warranty — for selected product categories',
        ],
        highlight: 'Warranty type and duration are listed on the product page. Check before purchasing.',
      },
      {
        icon: 'ban',
        tag: 'conditions',
        heading: 'What is not covered',
        body: 'Warranty claims are void in the following cases:',
        bullets: [
          'Physical damage caused after delivery (drops, cracks, bends)',
          'Liquid or moisture damage',
          'Unauthorized repair, modification, or opening of the device',
          'Electrical damage from improper power use',
          'Normal wear and tear',
          'Damage from misuse or use outside recommended conditions',
        ],
      },
      {
        icon: 'package',
        tag: 'process',
        heading: 'How to file a warranty claim',
        body: 'To initiate a warranty claim:',
        bullets: [
          'Open a support ticket from the order detail page',
          'Select "Warranty Claim" as the category',
          'Provide: order ID, product serial/IMEI number, description of issue',
          'Attach clear photos or a short video demonstrating the defect',
          'Our team will verify and route the claim to the appropriate service party',
        ],
      },
      {
        icon: 'clock',
        tag: 'timeline',
        heading: 'Warranty service timelines',
        body: 'Timelines vary by claim type:',
        bullets: [
          'Claim review by Ocean Bazar team: 1–2 business days',
          'Brand service center repair: 7–21 business days (varies by brand)',
          'Seller-handled replacement: 3–7 business days',
          'Parts not available: up to 30 days — you will be notified',
        ],
      },
    ],
  },
};

const BN_POLICIES: Record<PolicyKey, PolicyDocument> = {
  privacy: {
    title: 'প্রাইভেসি পলিসি',
    intro:
      'Ocean Bazar অর্ডার প্রসেস, সেবা উন্নয়ন এবং কাস্টমার অ্যাকাউন্ট নিরাপদ রাখতে যতটুকু প্রয়োজন ততটুকু তথ্য সংগ্রহ করে।',
    sections: [
      {
        heading: 'আমরা কী তথ্য সংগ্রহ করি',
        body:
          'কেনাকাটা সম্পন্ন করতে আমরা আপনার নাম, ফোন নম্বর, ইমেইল, ডেলিভারি ঠিকানা, অর্ডার ইতিহাস এবং প্রয়োজনীয় পেমেন্ট-সংক্রান্ত তথ্য সংগ্রহ করতে পারি।',
      },
      {
        heading: 'তথ্য কীভাবে ব্যবহার করি',
        body:
          'অর্ডার প্রসেস, আপডেট পাঠানো, কাস্টমার সাপোর্ট, প্রতারণা প্রতিরোধ এবং কেনাকাটার অভিজ্ঞতা উন্নত করতে আপনার তথ্য ব্যবহার করা হয়।',
      },
      {
        heading: 'ডেটা সুরক্ষা',
        body:
          'কাস্টমার তথ্যকে অননুমোদিত প্রবেশ, অপব্যবহার বা প্রকাশ থেকে রক্ষা করতে আমরা যুক্তিসঙ্গত প্রযুক্তিগত ও অপারেশনাল নিরাপত্তা ব্যবস্থা ব্যবহার করি।',
      },
      {
        heading: 'তৃতীয় পক্ষের সেবা',
        body:
          'পেমেন্ট গেটওয়ে, ডেলিভারি পার্টনার, অ্যানালিটিক্স টুল এবং যোগাযোগ সেবা তাদের কাজ সম্পন্ন করার জন্য সীমিত পরিসরে তথ্য প্রক্রিয়া করতে পারে।',
      },
    ],
  },
  returns: {
    title: 'রিটার্ন পলিসি',
    intro:
      'যোগ্য পণ্য নির্ধারিত রিটার্ন সময়সীমার মধ্যে ফেরত দেওয়া যেতে পারে, তবে পণ্যের অবস্থা ও ক্যাটাগরি-ভিত্তিক শর্ত প্রযোজ্য।',
    sections: [
      {
        heading: 'রিটার্নের যোগ্যতা',
        body:
          'যেখানে প্রযোজ্য, পণ্যটি অব্যবহৃত, অক্ষত এবং মূল প্যাকেজিং, ট্যাগ, এক্সেসরিজ ও ক্রয়ের প্রমাণসহ ফেরত দিতে হবে।',
      },
      {
        heading: 'যে পণ্য ফেরতযোগ্য নয়',
        body:
          'নষ্ট হওয়ার সম্ভাবনাযুক্ত পণ্য, ব্যক্তিগত যত্নের পণ্য, অন্তর্বাসজাত পণ্য, কাস্টম পণ্য এবং ফাইনাল সেল চিহ্নিত পণ্য সাধারণত ফেরতযোগ্য নয়।',
      },
      {
        heading: 'পণ্যের অবস্থা যাচাই',
        body:
          'ফেরত আসা পণ্য অনুমোদনের আগে পরিদর্শন করা হতে পারে। ব্যবহারের চিহ্ন, ট্যাম্পারিং বা অংশ অনুপস্থিত থাকলে রিটার্ন বাতিল হতে পারে।',
      },
      {
        heading: 'রিটার্ন প্রক্রিয়া',
        body:
          'কাস্টমার সাপোর্ট বা অর্ডার হিস্ট্রি থেকে রিটার্ন অনুরোধ শুরু করতে হবে। অনুমোদনের পর পিকআপ বা রিটার্ন নির্দেশনা দেওয়া হবে।',
      },
    ],
  },
  refunds: {
    title: 'রিফান্ড পলিসি',
    intro:
      'অনুমোদিত রিফান্ড পণ্যের অবস্থা ও যাচাই শেষে মূল পেমেন্ট পদ্ধতি অনুযায়ী প্রসেস করা হয়।',
    sections: [
      {
        heading: 'রিফান্ড অনুমোদন',
        body:
          'বাতিল অর্ডার, ডেলিভারি ব্যর্থ, ক্ষতিগ্রস্ত পণ্য যাচাই, অথবা অনুমোদিত রিটার্ন পরিদর্শন পাস করলে সাধারণত রিফান্ড অনুমোদিত হয়।',
      },
      {
        heading: 'রিফান্ড সময়সীমা',
        body:
          'রিফান্ডের সময় ব্যবহৃত পেমেন্ট পদ্ধতির উপর নির্ভর করে। মোবাইল ওয়ালেটে দ্রুত হতে পারে, আর কার্ড বা ব্যাংক রিফান্ডে বেশি সময় লাগতে পারে।',
      },
      {
        heading: 'আংশিক রিফান্ড',
        body:
          'কিছু ক্ষেত্রে অর্ডারের আংশিক অংশ ফেরত, প্রতিস্থাপন বা ডেলিভারি-পরবর্তী সমন্বয়ের জন্য আংশিক রিফান্ড প্রযোজ্য হতে পারে।',
      },
      {
        heading: 'বিলম্বিত রিফান্ড',
        body:
          'নির্ধারিত সময়ে রিফান্ড না পেলে কাস্টমারকে অর্ডার নম্বর ও পেমেন্ট তথ্যসহ সাপোর্টে যোগাযোগ করতে হবে।',
      },
    ],
  },
  shipping: {
    title: 'শিপিং পলিসি',
    intro:
      'Ocean Bazar বাংলাদেশজুড়ে ডেলিভারি দেওয়ার চেষ্টা করে, তবে অবস্থান, পণ্যের ধরন ও স্টকের উপর সময় ও খরচ নির্ভর করে।',
    sections: [
      {
        heading: 'ডেলিভারি কভারেজ',
        body:
          'আমরা সারাদেশে ডেলিভারি দেওয়ার লক্ষ্য রাখি। কিছু দূরবর্তী বা সীমিত এলাকায় ডেলিভারির সময় বেশি লাগতে পারে বা কিছু পেমেন্ট সীমাবদ্ধতা থাকতে পারে।',
      },
      {
        heading: 'আনুমানিক সময়',
        body:
          'বড় শহরের ভেতরে ডেলিভারি সাধারণত দ্রুত হয়। শহরের বাইরে অতিরিক্ত কর্মদিবস লাগতে পারে।',
      },
      {
        heading: 'শিপিং চার্জ',
        body:
          'অর্ডারের পরিমাণ, গন্তব্য, ফালফিলমেন্ট সোর্স, ক্যাম্পেইন নিয়ম বা কুরিয়ারের প্রাপ্যতার উপর শিপিং চার্জ ভিন্ন হতে পারে।',
      },
      {
        heading: 'ডেলিভারি প্রচেষ্টা',
        body:
          'দেওয়া ফোন নম্বরে কাস্টমারকে যোগাযোগযোগ্য থাকতে হবে। ব্যর্থ ডেলিভারি প্রচেষ্টায় বিলম্ব হতে পারে বা পুনরায় ডেলিভারির আগে অগ্রিম পেমেন্ট লাগতে পারে।',
      },
    ],
  },
  terms: {
    title: 'শর্তাবলি',
    intro:
      'Ocean Bazar ব্যবহার করার মাধ্যমে আপনি আমাদের মার্কেটপ্লেস নিয়ম, পেমেন্ট শর্ত এবং গ্রহণযোগ্য ব্যবহার নীতিমালা মেনে নিতে সম্মত হচ্ছেন।',
    sections: [
      {
        heading: 'অ্যাকাউন্টের দায়িত্ব',
        body:
          'কাস্টমার তার অ্যাকাউন্টের তথ্য সঠিক রাখা এবং লগইন তথ্য নিরাপদ রাখার জন্য দায়ী।',
      },
      {
        heading: 'মূল্য ও স্টক',
        body:
          'মূল্য, ছাড়, স্টক অবস্থা এবং অফার পূর্ব ঘোষণা ছাড়াই পরিবর্তিত হতে পারে। স্টক বা মূল্যগত সমস্যায় অর্ডার বাতিল হতে পারে।',
      },
      {
        heading: 'অর্ডার গ্রহণ',
        body:
          'অর্ডার কনফার্মেশন সবসময় চূড়ান্ত গ্রহণ নিশ্চিত করে না। প্রতারণা, স্টক বা অপারেশনাল কারণে অর্ডার যাচাই হতে পারে।',
      },
      {
        heading: 'অপব্যবহার নিষিদ্ধ',
        body:
          'অফারের অপব্যবহার, ভুয়া দাবি, ভুয়া অ্যাকাউন্ট বা প্ল্যাটফর্মে হস্তক্ষেপ করলে অর্ডার বাতিল বা অ্যাকাউন্ট সীমাবদ্ধ করা হতে পারে।',
      },
    ],
  },
  warranty: {
    title: 'ওয়ারেন্টি পলিসি',
    intro:
      'ওয়ারেন্টি কভারেজ পণ্যের ব্র্যান্ড, বিক্রেতার প্রতিশ্রুতি এবং প্রযোজ্য নির্মাতার শর্তের উপর নির্ভর করে।',
    sections: [
      {
        heading: 'ওয়ারেন্টির পরিধি',
        body:
          'কিছু পণ্যে ব্র্যান্ড ওয়ারেন্টি, সেলার ওয়ারেন্টি বা সার্ভিস ওয়ারেন্টি থাকতে পারে। ক্যাটাগরি অনুযায়ী সময়সীমা ও শর্ত ভিন্ন হতে পারে।',
      },
      {
        heading: 'যা কভার হবে না',
        body:
          'শারীরিক ক্ষতি, পানির ক্ষতি, অনুমোদনহীন মেরামত, বৈদ্যুতিক ক্ষতি এবং ভুল ব্যবহারের জন্য সাধারণত ওয়ারেন্টি প্রযোজ্য নয়।',
      },
      {
        heading: 'ক্লেইম প্রক্রিয়া',
        body:
          'ওয়ারেন্টি ক্লেইমের সময় কাস্টমারকে ইনভয়েস, অর্ডার নম্বর, সিরিয়াল নম্বর এবং ছবি বা ভিডিও দিতে হতে পারে।',
      },
      {
        heading: 'সার্ভিস সময়',
        body:
          'ওয়ারেন্টি নিষ্পত্তির সময় ব্র্যান্ড সার্ভিস সেন্টারের সাড়া, পণ্যের ধরন এবং যন্ত্রাংশের প্রাপ্যতার উপর নির্ভর করে।',
      },
    ],
  },
};

export const POLICY_ORDER: PolicyKey[] = ['privacy', 'returns', 'refunds', 'shipping', 'terms', 'warranty'];

export function getPolicies(locale: string): Record<PolicyKey, PolicyDocument> {
  return locale === 'bn' ? BN_POLICIES : EN_POLICIES;
}
