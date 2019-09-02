using BraintreeHttp;
using Newtonsoft.Json;
using PayPalCheckoutSdk.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Backend.Util
{
    public class PayPalClient
    {
        /**
            Setting up PayPal environment with credentials with sandbox cerdentails. 
            For Live, this should be LiveEnvironment Instance. 
         */
        public static PayPalEnvironment environment()
        {
            return new SandboxEnvironment("ATsKexGYCoUhokUVT1tHhSjXHKAuvNcRLNNFXWYbyzsS7uPFOThLrcoesZjsDWjhp2Ly3xBWFzp00T3t", "EBaBjjunF1b9vELlbVTI7APhKHz77h6EGGkp6eSpFFrcWEBQGxmSXnNiNEArUtzlIq4Az9j-Wu7B6Bps");
        }

        /**
            Returns PayPalHttpClient instance which can be used to invoke PayPal API's.
         */
        public static HttpClient client()
        {
            return new PayPalHttpClient(environment());
        }

        public static HttpClient client(string refreshToken)
        {
            return new PayPalHttpClient(environment(), refreshToken);
        }

        /**
            This method can be used to Serialize Object to JSON string.
        */
        public static String ObjectToJSONString(Object serializableObject)
        {
            return JsonConvert.SerializeObject(serializableObject);
        }
    }
}