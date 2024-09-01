---
title: 'Pneumonia Detection from Chest Radiographs'
description: Explore the possibilities of time travel through an immersive website for a fictional travel agency, complete with dynamic destination timelines and interactive historical events.
publishDate: 'Jun 10 2021'
isFeatured: true
seo:
  image:
    src: '/portfolio/project-2.jpg'
    alt: Project preview
---

![Project preview](/portfolio/project-2.jpg)

## Inspiration

The penetration of health insurance across India stood at around 35 percent as of financial year 2018. However, a large section of the society was covered via government sponsored health care schemes, even though the coverage provided was inadequate⁽¹⁾. One of the most pressing problems in India remains a severe shortage of trained manpower in the medical stream, this includes doctors, nurses, paramedics and primary healthcare workers. … The doctor-to-patient ratio remains abysmally low, which is merely 0.7 doctors per 1,000 people⁽²⁾.

This scenario is found across much of the developing world. It is in the backdrop of this reality that the AI in Medical Sciences induistry is booming filling a gap of qualified healthcare workers along with providing new insights to those in the medical field.

**Project Overview:**
TimeWarp Travel Agency aims to redefine the travel experience by offering an innovative and immersive online platform that explores the concept of time travel. The website combines cutting-edge technology with captivating storytelling to provide users with a unique journey through time.

> As pneumonia is a serious adverse effect on the health of a patient any model developed must have a lower tolerence for cases of False Negatives as compared to False Positives.

## Objectives

1. Train a Deep Learning model on Chest Radiographs for the presence of pneumonia.
2. Deploy this model wrapped with a simple UI for use by anyone across the globe.

## Baseline Human Level Performance

The Human Level Performace (HLP) is taken from the Article “Comparison of Chest Radiograph Interpretations by Artificial Intelligence Algorithm vs Radiology Residents”. The article states that “The trained AI algorithm achieved a mean AUC across labels of 0.807” and “The mean image-based sensitivity for AI algorithm was 0.716 (95% CI, 0.704-0.729) and for radiology residents was 0.720(95% CI, 0.709-0.732)”. This gives us a baseline to try and achieve and overcome.

## Technology Stack

- **Model Development:** [Astro.js](https://astro.build/) for a dynamic and responsive user interface and [Tailwind CSS](https://tailwindcss.com/) for styling.
- **Model Deployment:** Node.js for handling server-side logic and API integration.

## Implementation Details

The TimeWarp Travel Agency Website successfully brings the concept of time travel to life, providing users with a captivating and educational experience. The website not only serves as a travel planning tool but also as an interactive platform that encourages users to explore and appreciate the rich tapestry of human history.

## Further Ideas

- To work on improving the accuraccy of the Model especially in regards to lowering the False Negative Rate.
- More User-friendly UI

## References


