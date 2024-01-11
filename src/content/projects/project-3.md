---
title: 'TransPredict: An AI Customer Transaction Predictor'
description: RoboChef Recipe Assistant is a groundbreaking mobile application that leverages artificial intelligence to redefine the cooking experience.
publishDate: 'Aug 11 2021'
isFeatured: true
seo:
  image:
    src: '/project-3.jpg'
---

![Project preview](/project-3.jpg)

## Inspiration
The power of AI is being realized by many industries across the spectrum of human activities. One major beneficiary of this revolution has been the financial industry with their vast troves of organized data. Many banks, however, have struggled to move from experimentation around select use cases to scaling AI technologies across the organization. Reasons include the lack of a clear strategy for AI, an inflexible and investment-starved technology core, fragmented data assets, and outmoded operating models that hamper collaboration between business and technology teams.

AI technologies can lead to higher automation and, when deployed after controlling for risks, can often improve upon human decision making in terms of both speed and accuracy. The potential for value creation is one of the largest across industries, as AI can potentially unlock $1 trillion of incremental value for banks, annually⁽¹⁾.

**Project Overview:**
This Dataset is avavilable on Kaggle. The challenge was to help Santander identify which customers will make a specific transaction in the future, irrespective of the amount of money transacted. This is an anonymized dataset containing numeric feature variables, the binary target column, and a string ID_code column.

## Objectives
The objective is to develop a fully managed AI prediction service with the help of cloud services to determine transaction decisions. The AI model is to be built, trained and deployed in a fully automated pipeline with MLOps principles.

### Baseline Human Level Performance
Since this is a strucutred data we cannot easily establish a Human Level Pefromance Benchmark.

## Technology Stack




## Implementation Details
The Preliminary Work was carried out in Kaggle Notebooks. This involves a EDA of the data, feature engineering and feature selection process were tried and tested in these notebooks.

This project uses 10-fold cross validation with the XGBoost model trained on GPU to aim for high mean validation accuraccy. The hyperparameters were tuned with the help of Optuna library in Python using bayesian Search. This also allows us to understand the relative importance of different hyperparameters. And lastly I used the AutoML library H20.ai to get a really good stacked model endemble. This was the first iteration of the MLOps cycle.

I have used the Area under the curve metric to determine the quality of the trained model.

I then implemented the code in a more systematic manner in Python with logger libraries and the MLFlow framework and made the use of virtual environemnt to allow for the easy containerization of the application. Also, the prediction script file was finally added to gain new predicition results from the trained model. The MLflow framework allows the easy tracking of the many models that are tuned with the help of Optuna.

I choose to implement a cloud-based solution to this problem in order to advantage of more powerful hardware and to build a more comprehensive service platform. I have built a CI/CD pipeline in line with MLOps ideas to fully automate the data acquisition, model building, training and deployment suign Endpoints. This was done with the help of Sagemaker Pipelines.

All the code is available in the Github Repository. The main branch indicates the Docker based implementation while the Sagemaker branch containes files used in the implementation of the problem solution on AWS cloud services.

## Outcome



## Source Code

[Github Repository](https://github.com/akhilnas/santander-customer-transaction)

## References & Acknowledgement

1. [McKinsey Report](https://www.mckinsey.com/industries/financial-services/our-insights/ai-bank-of-the-future-can-banks-meet-the-ai-challenge)
2. Photo by [Beatriz Pérez Moya](https://unsplash.com/@beatriz_perez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/accounting?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)