package app.mocare;

import com.airbnb.android.react.maps.MapsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;
import com.wix.reactnativeuilib.wheelpicker.WheelPickerPackage;
import com.wix.interactable.Interactable;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.cmcewen.blurview.BlurViewPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.underscope.react.fbak.RNAccountKitPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index.android";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(new LinearGradientPackage(), new RNFetchBlobPackage(),
                new VectorIconsPackage(), new ReactNativeConfigPackage(), new FastImageViewPackage(),
                 new MapsPackage(), new RNNotificationsPackage(MainApplication.this),
                new RNFirebasePackage(), new RNFirebaseAnalyticsPackage(), new RNAccountKitPackage(),
                new HighlighterViewPackage(), new TextInputDelKeyHandlerPackage(), new WheelPickerPackage(),
                new BlurViewPackage(), new Interactable());
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
