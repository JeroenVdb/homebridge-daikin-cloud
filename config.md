# Get config parameters

The following parameters are required:
- Client ID
- Client Secret
- Redirect URI
- Authorisation Code

First 3 values you will get when you set up your App in the Daikin Europe Developer Portal.

## Create an App in the Daikin Europe Developer Portal

1. Go to https://developer.cloud.daikineurope.com/
2. In the upper right corner click your name and select "My Apps"
3. Click "+ New App"
4. Fill in your application name, auth strategy (Onecta OIDC) and redirect URI (this should be a domain you trust because the authorisation code will be 
   sent there)
5. Click create

You will receive a Client ID and Client Secret (keep it with you, you'll only see it once). The Redirect URI is the one you entered in step 4.

## Get the Authorisation Code

1. Open a browser and go to the following URL (replace <CLIENT_ID> and <REDIRECT_URI> with the values you received in the previous step):
   ```
   https://idp.onecta.daikineurope.com/v1/oidc/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&scope=openid%20onecta%3Abasic.
   integration
2. You will be redirected to the redirect URI you entered in the previous step. The URL will contain the authorisation code with parameter ?
   code=<authorisation code>. Copy it.   



## Good to know
