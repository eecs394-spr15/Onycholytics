# Onycholytics App

Onycholytics is a disease-tracking applicaion for mobile and tablet devices that helps patients track the healing progress of Onycholysis infected nails. Patients may take photos on their toes and edit afterwards for standardization purposes. After editing, patients may view their photos in a gallery presented in timeline form. Onycholytics also allows patients to reach out and contact doctors with questions. 

##Motivation

# Development Instructions
##SYSTEM REQUIRMENTS
- [AngularJS](https://angularjs.org/) - HTML enhanced for web apps!
- [Supersonic](http://www.appgyver.com/supersonic/ui) - Build beautiful data-driven apps with real native performance
- [Parse](https://parse.com/) - dynamic web app hosting and database

## Setting up AppGyver Steroids

We used the AngularJS and AppGyver Steroids frameworks to build this mobile app. Here are some steps required to get everything set up:

1. [Create an account for AppGyver](http://www.appgyver.com/steroids_sign_up)
2. [Set up developing tools](https://academy.appgyver.com/installwizard/steps#/home) 

## Downloading Source Code and Dependencies

1. Clone the code package and place it in your desired directory
2. Open the Command Line (Windows) or Terminal (OSX) in the Onycholytics root directory and run:

```
steroids update
```

## Developing the App

To test the code you've written, open the Command Line (Windows) or Terminal (OSX) in the FeldcoLoanRequest root directory and run:
```
steroids connect
```
A web page will open containing a QR code that you may scan using the [AppGyver Scanner app](https://play.google.com/store/apps/details?id=com.appgyver.freshandroid&hl=en) on your tablet. You may also open an emulator. Instructions for setting up the GenyMotion Android Emulator can be found [here.](http://docs.appgyver.com/tooling/cli/emulators/genymotion/)

At the top of the file there should be a short introduction and/ or overview that explains what the project is.

## Using the Parse.com Backend

## Deployment

# Present Features
1. Patients and coordinators can login the app on the initial page.
2. Patients have the option to fill the initial survey when login the app for the 1st time.
3. Patients can take pictures for their toes following the instructions on Camara Tap.
4. Patients can edit and crop the taken picture to standardize the nail part and put it in the gallary
5. Patients can compare the history pictures in the gallary and set up communication with other patients and coordinators


# Current bugs and limitations
## Current bugs
1. For android system, taken photos in got rotated 90 degree in our app before editing.
2. Survey is too big for view at present.
3. Survey cannot be viewed in Android system.
4. The signin and signup system is not completed.
5. The order of taken photos may be wrong.

## Limitations to improve
1. Make the survey page fit the screen.
2. Use camera plugins instead of editing photos.
3. Improve the function for coordinators (doctors),e.g.respond the patients problem and give them suggestion.
4. Reduce the resolution lost.
