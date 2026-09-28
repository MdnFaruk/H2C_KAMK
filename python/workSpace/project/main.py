s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 80))
s.listen(5)

button = Pin(4, Pin.IN)

def change():
    global temp, hum, pres, dew_p
    bme = BME280.BME280(i2c=i2c)
    sensor.measure()
    temp = round(sensor.temperature(),2)           #temp and hum taking from dht11
    hum = round(sensor.humidity(),2)               #hum taking from dht11
    pres = bme.pressure                            #pressure taking from BME280
    dew_p = dew_point(temp,hum)


def dew_point(temperature, humidity):
    H = (math.log10(humidity)-2)/0.4343 + (17.62*temperature)/(243.12+temperature)  # dewpoint calculation from temp and hum
    Dewp = 243.12*H/(17.62-H)
    return round(Dewp, 2)

def web_page():
  html = """
        <!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<body class="container">
    <div class="border border-3 rounded-3 col-4 p-4 offset-4 mt-5 text-center">
        <h1 class="mb-5 mt-2">ESP32 Mittaukset</h1>
        <table class="table table-borderless ms-4">
            <tbody class="text-start">
                <tr>
                    <th scope="row">Temperature</th>
                    <td><span>"""+str(temp)+"""</span></td>
                </tr>
                <tr>
                    <th scope="row">Humidity</th>
                    <td><span>"""+str(hum)+"""</span></td>
                </tr>
                <tr>
                    <th scope="row">Pressure</th>
                    <td><span>"""+str(pres)+"""</span></td>
                </tr>
                <tr>
                    <th scope="row">Dew Point</th>
                    <td><span>"""+str(dew_p)+"""</span></td>
                </tr>
            </tbody>
        </table>
        <button onclick="">Start Data</button>
    </div>
</body>

</html>
        """
  return html

def refresh():
    print('T:',temp,'H:',hum,'P:',pres,'D:',dew_p)
    print(button.value())
    conn, addr = s.accept()
    print('Got a connection from %s' % str(addr))
    request = conn.recv(1024)
    print('Content = %s' % str(request))
    response = web_page()
    conn.send('HTTP/1.1 200 OK\n')
    conn.send('Content-Type: text/html\n')
    conn.send('Connection: close\n\n')
    conn.sendall(response)
    conn.close()
x= True   
while x:
  print('------000===faruk',button.value())  
  try:
      change()
      refresh()     
      if (button.value()==1):
          print(button.value())
          change()
      
    
    
  except OSError as e:
    print('Failed to read sensor.')