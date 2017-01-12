module.exports = {
    name: 'qa'
    , environs: {
        QA3S1: {
            appId: '121fbe9c-0163-4f88-97a2-36b50c1ebb71'
            , clientId: 'yx2t3gn576we4mhdrn8q3faj'
            , clientSecret: 'vheBCeD6aKCeb2Yntm9km7gQ'
            , appSignature: '020lfnmwmdfau4kfayaiggjhzpedxvram3yhcro4or0aqcxse2vlgrkchspkp15opjdccztwmubul42i2fyimyl2uyi0q5r25yq3slqpfg0bzy3yhl5xpivwtdfrd2aushgow2ypgvzfclv13gdw0bpsqxjxr5oizihvvqhabvjuquuwkdxz3dz0bx4m5jhngbsdc3apcsrxtajm0oxqhhfubhmn0heqoj05hzi0emuwispcef2yhdhi3vn1shd'
            , authUrl: 'https://auth-qa1s1.exacttargetapis.com/v1/requestToken?legacy=1'
            , restHost: 'rest.s1.qa1.exacttarget.com'
            , restPort: 443
            , restIsSSL: true
            , hubHost: 'mc.s1.qa1.exacttarget.com'
            , tokenExpireBuffer: ( 60 * 1000 ) // within one minute of expiration
            , ssoUrl: 'https://mc.s1.qa1.exacttarget.com/cloud/tools/SSO.aspx?env=default&legacy=1&sk=QA3S1'
        }
    }
    , fuelApi: {
        hostname: 'www.exacttargetapis.com'
    }
};
