package com.mydialerapp

import android.app.role.RoleManager
import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class DialerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Initialization code if needed
    }

    override fun getName(): String {
        return "DialerModule"
    }

@ReactMethod
fun requestDefaultDialerRole(callback: Callback) {
    val roleManager = getReactApplicationContext().getSystemService(RoleManager::class.java)
    val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_DIALER)
    currentActivity?.startActivityForResult(intent, REQUEST_CODE)
    callback.invoke("Request sent")
}


    @ReactMethod
    fun dialNumber(number: String) {
        val intent = Intent(Intent.ACTION_CALL)
        intent.data = Uri.parse("tel:$number")
        currentActivity?.startActivity(intent)
    }

    companion object {
        const val REQUEST_CODE = 1001
    }
}
