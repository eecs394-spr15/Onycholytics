package com.YangHong;

import java.util.*;

import java.io.File;

import org.testng.Assert;
import org.testng.asserts.*;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import io.appium.java_client.AppiumDriver;


public class NGTest {
	public static WebDriver driver;
	
	@BeforeMethod
	public void beforeTest() throws Exception {
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("automationName", "Appium");
		//capabilities.setCapability("browserName", "");
		capabilities.setCapability("platformName","Android");
		capabilities.setCapability("platfromVersion","4.4.2");
		capabilities.setCapability("databaseEnabled","true");
		capabilities.setCapability("deviceName","yang");
		capabilities.setCapability("app-activity",".RootActivity");
		driver = new RemoteWebDriver(new URL("http://127.0.0.1:4723/wd/hub"),capabilities);
	}
	
	  @Test
	  public void test() throws InterruptedException{
		  Thread.sleep(5000); 
		  // test patient login
		  // test wrong login name and password
		  WebElement textFieldUsername = driver.findElement(By.xpath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[2]/android.widget.EditText[1]")); 
		  textFieldUsername.sendKeys("pat");
		  WebElement textFieldPassword = driver.findElement(By.xpath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[2]/android.widget.EditText[2]"));
		  textFieldPassword.sendKeys("pat");
		  
		  WebElement buttonLoginPatient = driver.findElement(By.xpath("////android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[2]/android.view.View[4]/android.widget.Button[1]"));
		  buttonLoginPatient.click();
		  
		  //test right login name and password
		  textFieldUsername.clear();
		  textFieldUsername.sendKeys("patient");
		  textFieldPassword.clear();
		  textFieldPassword.sendKeys("patient");
		  buttonLoginPatient.click();
		  
		  Thread.sleep(5000);
		  WebElement logoutButton = driver.findElement(By.xpath(" //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[2]/android.widget.LinearLayout[1]/android.widget.TextView[1]"));
		  logoutButton.click();
		  
		  Thread.sleep(5000); 
		  // test patient login
		  // test wrong login name and password
		  textFieldUsername.sendKeys("coordinator");
		  textFieldPassword.sendKeys("coordinator");		  
		  WebElement buttonLoginCoordinator = driver.findElement(By.xpath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[2]/android.view.View[5]/android.widget.Button[1]"));
		  buttonLoginCoordinator.click();
		  
		  //test right login name and password
		  textFieldUsername.clear();
		  textFieldUsername.sendKeys("studyCoordinator");
		  textFieldPassword.clear();
		  textFieldPassword.sendKeys("studyCoordinator");
		  buttonLoginCoordinator.click();		  
	  }
	  
	  @AfterMethod
	  public void afterTest() {
		  driver.quit();
	  }
}
