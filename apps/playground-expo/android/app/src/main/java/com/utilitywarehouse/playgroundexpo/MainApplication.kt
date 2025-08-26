package com.utilitywarehouse.playgroundexpo

import android.app.Application
import android.content.res.Configuration

import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
// @generated begin expo-xml-font:import-rn-font-manager-line - expo prebuild (DO NOT MODIFY) sync-8db7d72c4455673fdb49dd352d8b1bc014b8a248
import com.facebook.react.views.text.ReactFontManager
// @generated end expo-xml-font:import-rn-font-manager-line
import com.facebook.react.ReactHost
import com.facebook.react.common.ReleaseLevel
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost

import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
      this,
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

          override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"

          override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

          override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      }
  )

  override val reactHost: ReactHost
    get() = ReactNativeHostWrapper.createReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
// @generated begin expo-xml-font:add-custom-font-line - expo prebuild (DO NOT MODIFY) sync-794d28f844e9f7f84e442d2e5941595ea447d093
ReactFontManager.getInstance().addCustomFont(this, "Comic Hams", R.font.comichams)
ReactFontManager.getInstance().addCustomFont(this, "DM Sans", R.font.dmsans)
ReactFontManager.getInstance().addCustomFont(this, "DM Mono", R.font.dmmono)
// @generated end expo-xml-font:add-custom-font-line
    try {
      DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.valueOf(BuildConfig.REACT_NATIVE_RELEASE_LEVEL.uppercase())
    } catch (e: IllegalArgumentException) {
      DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.STABLE
    }
    loadReactNative(this)
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}
