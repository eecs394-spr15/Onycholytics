# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Camera"
      id: "camera"
      location: "example#getting-started" # Supersonic module#view type navigation
    }
    {
      title: "Photos"
      id: "photos"
      location: "camera#index" # URLs are supported!
    }
    {
      title: "Messages"
      id: "messages"
      location: "camera#message"
    }
  ]

  initialView:
      id: "initialView"
      location: "camera#login"


  # rootView:
  #   location: "example#getting-started"

  preloads: [
    {
      id: "learn-more"
      location: "example#learn-more"
    }
    {
      id: "using-the-scanner"
      location: "example#using-the-scanner"
    }
  ]


  #drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#getting-started"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  
  # initialView:
  #   id: "initialView"
  #   location: "example#initial-view"
