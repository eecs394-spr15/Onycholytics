package com.YangHong;

import java.util.*;
import org.testng.Assert;
import org.testng.asserts.*;
import org.testng.annotations.Test;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.AfterTest;
import org.openqa.selenium.*;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.touch.TouchActions;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileDriver;
import io.appium.java_client.TouchAction;
import io.appium.java_client.TouchShortcuts;
import io.appium.java_client.ios.*;

public class NGTest {
	public static AppiumDriver wd;
	
	@BeforeTest
	public void beforeTest() throws Exception {
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("automationName", "Appium");
		capabilities.setCapability("browserName", "");
		//capabilities.setCapability("autoLaunch",true);
		//capabilities.setCapability(CapabilityType.BROWSER_NAME, "safari");
		capabilities.setCapability("platfromName","iOS");
		capabilities.setCapability("platfromVersion","8.3");
		capabilities.setCapability("deviceName","iPad Simulator");
		capabilities.setCapability("showIOSLog",true);
		wd = new IOSDriver(new URL("http://127.0.0.1:4723/wd/hub"),capabilities);
		wd.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
	}
	
	  @Test
	  public void test() throws InterruptedException{
		  //wd.get("https://www.google.com/");
		  Thread.sleep(30000);
	  }
	  
	  @AfterTest
	  public void afterTest() {
	  }
}
