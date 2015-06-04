# Onycholytics App

##Synopsis
Onycholytics is a disease-tracking applicaion for mobile and tablet devices that helps patients track the healing progress of Onycholysis infected nails. Patients may take photos on their toes and edit afterwards for standardization purposes. After editing, patients may view their photos in a gallery presented in timeline form. Onycholytics also allows patients to reach out and contact doctors with questions. 

# Development Instructions
##SYSTEM REQUIRMENTS
- [AngularJS](https://angularjs.org/) - Front End Javascript framework
- [Supersonic](http://www.appgyver.com/supersonic/ui) - Hybrid application framework with native performance
- [Parse](https://parse.com/) - Cloud based object storage database
- [HammerJS](http://hammerjs.github.io/) - Incorporates touch sensing in Javascript

## Setting up AppGyver Steroids

We used the AngularJS and AppGyver Steroids framework to build this app. Here are some steps required to get everything set up:

1. [Create an account for AppGyver](http://www.appgyver.com/steroids_sign_up)
2. [Set up developing tools](https://academy.appgyver.com/installwizard/steps#/home) 

## Downloading Source Code and Dependencies

1. Clone the code package from Github and place it in your desired directory.
2. Open the Command Line (Windows) or Terminal (OSX) in the Onycholytics directory and run:

```
steroids update
```

## Developing the App

To test the code you've written, open the Command Line (Windows) or Terminal (OSX) in the Onycholytics directory and run:
```
steroids connect
```
A web page will open containing a QR code that you may scan using the [AppGyver Scanner app](https://play.google.com/store/apps/details?id=com.appgyver.freshandroid&hl=en) on your device. You may also open it on an emulator. Instructions for setting up the Android Emulator can be found [here.](http://docs.appgyver.com/tooling/cli/emulators/genymotion/)

At the top of the file there should be a short introduction and/ or overview that explains what the project is.

## Using the Parse.com Backend

## Deployment

# Present Features
1. Users may login as either a Patient or Coordinator. 
2. Patients have the option to fill the initial survey when login to the app for the 1st time.
3. Patients can take pictures of their toes through the default camera app.
4. After taking the photo, patients can edit and crop the image to standardize the photo for viewing. 
5. Patients can view their past photos in the gallery, and track progress over time.
6. Patients can reach out and communicate with doctors or "Coordinators".


# Current Bugs and Limitations
## Current Bugs
1. Lots of issues on Android. (Survey cannot be viewed, image rotates 90 degrees on editing, and Camera app fails to open at times)
2. Survey is too big, we can't find a way to resize it.
3. The Login system is currently just for a Patient and Coordinator user. Users can't create an account yet.
4. The gallery may not display an image on load (just hit next once).
5. The gallery may load images out of order and repeat images.

## Limitations
1. An appropriate Camera Plugin wasn't found to create an overlay on the camera. 
2. Limited compatability with Android.
3. The app tends to crash on higher resolution devices such as the iPhone 6.
4. The app can't handle images with very high resolution.
