# LearningNotes
This is a set of learning notes consisting of algorithm,DP,Spring and so on. 



```go
if err != nil && os.IsNotExist(err) {
    _, err = os.Create(certFilePath)

    infoObj := license.NewLicenseInfo()
    loadDeviceInfo(infoObj.DeviceInfo)
    loadMagicKey(infoObj)

    info, err := json.Marshal(infoObj)
    if err != nil {
        stdlog.Error(err)
        return nil, nil, nil, err
    }

    cert := append(make([]byte, license.SignatureLen+license.PemLen), info...)
    err = ioutil.WriteFile(certFilePath, cert, 777)
    if err != nil {
        stdlog.Error(err)
        return nil, nil, nil, err
    }
}


```

