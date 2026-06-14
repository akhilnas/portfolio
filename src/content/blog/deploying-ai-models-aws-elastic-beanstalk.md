---
title: Deploying AI Models on AWS Elastic Beanstalk
excerpt: You have acquired the data, preprocessed and cleaned it, analyzed and developed models — but ultimately, to be useful to others, it has to be deployed. This is a generic walkthrough of deploying with AWS Elastic Beanstalk.
publishDate: 'Jul 21 2021'
tags:
  - AWS
  - Deep Learning
  - Cloud Computing
---

> Originally published on [Medium](https://medium.com/@eakhil711/deploying-ai-models-on-aws-elastic-beanstalk-e2163965b1f6).

This article aims to address a serious component in the Data Pipeline of today. You have acquired the data, preprocessed and cleaned the data, analyzed and developed models — but ultimately, to be useful to others, it has to be deployed.

Deployment of AI/ML models is the process by which we make the model available for use by others. This can be achieved with the help of cloud service platforms like Amazon Web Services, Microsoft Azure, Google Cloud Platform, Heroku and others. This article deals with deploying using the Amazon Web Service Elastic Beanstalk.

## Why Elastic Beanstalk?

If you do not want to deal with the complexities of setting up EC2 instances, the associated security and other ancillary services like web servers — and you have developed your application outside of SageMaker — then Elastic Beanstalk is the best fit for you. It takes care of most of the implementation details while giving you a few high-level options to customize as per your needs.

## Step 1: Create an AWS Account

In order to start this journey you need to have an account with Amazon Web Services. There are plenty of tutorials available that will help you create an AWS account, understand Free Tier usage, and create an IAM user.

## Step 2: Log into the AWS Management Console with your IAM account user

## Step 3: Go to AWS Elastic Beanstalk

In the Management Console window you should have a Services navbar at the top of the page. Under the Services dropdown, look at Compute Services and Elastic Beanstalk should be available there.

On the Elastic Beanstalk home page, the left-hand navbar shows three links — Environments, Applications and Change History.

- **Environments:** An environment is the configuration of your cloud compute along with all of the security and storage configurations. It lists the current active environment running. This is all of the instances that are still running your applications.
- **Applications:** An application is the web application that you intend to run on the created environment. This is the list of all the applications that you have created. This includes those whose environments have been terminated.

## Step 4: Create New Environment

Click on the *Create a New Environment* button. On the page that pops up, select **Web Server environment**, since we intend to create a web server to process HTTP requests.

The next page asks us to input the details regarding the application and the environment:

- Choose an Application Name
- Choose an Environment Name
- If needed you can add a Description
- Choose a Platform. For this example I am sticking with Python.
- Choose the Python version. This has to be done carefully in order to ensure that your application is compatible with the selected version of Python. I am selecting Python 3.7.
- Choose to upload your source code in the form of a `.zip` file or get started with a sample application. I prefer to go with the sample application as it helps me to debug any set-up errors easily.

Now Elastic Beanstalk has a certain default configuration. This can be modified by clicking on the *Configure More Options* button. Depending on the application you intend to run you can customize the capacity of the machine required, the security and many other settings. For now we will stick with the default settings.

Click on the *Create Environment* button to complete the process. AWS will now create the environment for you. This will take some time. There is no need for any keyboard prompt.

Upon the successful creation of the environment you will automatically be redirected to the environment home page. A few things to explain before we move on:

- It is very important that the **Health** remains **Ok**. This means that everything is fine.
- **Pending** means that the process is running.
- On the right side you can see the Python version and the system on which it is running.

If you click on the link under the Environment Name it will take you to a default welcome page that is created with the sample application that we selected. You can deploy by clicking on the *Upload and Deploy* button and then choosing your `.zip` file.

This is a very generic tutorial for using AWS Elastic Beanstalk. In the next section we will use a test-case to implement a sample Flask web application.

## Preparing Project Files for Deployment

This article will not go into details regarding writing Flask/Django applications. The assumption is that you have an application ready that works on your local system.

For those using the Flask framework, be aware that Elastic Beanstalk only accepts defining the application as `application`. Short forms such as `app` or `appli` do not work.

```python
application = Flask(__name__)
application.secret_key = "secret key"
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
```

Create a new folder in your project directory named `.ebextensions`. Elastic Beanstalk also needs a certain Python configuration file. Save the following in a `python.config` file:

```yaml
option_settings:
  "aws:elasticbeanstalk:container:python":
    WSGIPath: application:application
```

All the files in `.ebextensions` are run before the actual application. If you want to install additional system-wide packages that are not available in the assigned cloud compute, use the following format:

```yaml
# Install git in order to be able to bundle gems from git
packages:
  yum:
    libSM: []
    libXrender: []
    libXext: []
```

The above file is saved as `elastic_beanstalk_install_packages.config`. This file instructs the AWS EB service to install these packages before deploying the application. Note that we use `yum` since by default AWS EB assigns Amazon Linux, which is a CentOS distribution. For an Ubuntu distribution the command would be `apt-get`.

Along with all your project files there should be a `requirements.txt` file that lists all the additional Python packages that your application needs. This can be done manually by listing out all the additional packages that you have used (take care that you list out the correct version of the package — some of the installed packages on your system may not be the latest version that would be downloaded by AWS EB). If you are working with a virtual environment then the following command will automatically save it for you:

```bash
pip freeze > requirements.txt
```

Compress all the relevant project files along with your `.ebextensions` and `requirements.txt` into a `.zip` file and then upload it to the environment.

A final takeaway: most likely your project would require a more substantial EC2 instance than what the free tier provides. If that is the case then click on the aforementioned *Configure More Options* button and change the settings in the Capacity subsection to the required instance.

Hope this saves you time researching while you deploy your project.
