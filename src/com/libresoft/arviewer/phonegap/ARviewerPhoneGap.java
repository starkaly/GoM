package com.libresoft.arviewer.phonegap;

import com.phonegap.*;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.view.ViewGroup.LayoutParams;
import android.widget.RelativeLayout;

public class ARviewerPhoneGap extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
        		WindowManager.LayoutParams.FLAG_FULLSCREEN);
        
        super.init();
        super.loadUrl("file:///android_asset/www/index.html");
        
        setContentView(R.layout.main);
        RelativeLayout view = (RelativeLayout)findViewById(R.id.phonegap_container);
        
        View html = (View)appView.getParent();
        html.setBackgroundColor(Color.TRANSPARENT);
        view.addView(html,  new LayoutParams(LayoutParams.FILL_PARENT,
        		LayoutParams.FILL_PARENT));
        
        appView.setBackgroundColor(Color.TRANSPARENT);
        
        // Avoid the focus on click events
        appView.setFocusable(false);
        
    }
}