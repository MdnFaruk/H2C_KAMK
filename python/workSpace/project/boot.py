try:
  import usocket as socket
except:
  import socket

from machine import Pin, I2C
from time import sleep
import dht, BME280, math, network, esp, gc

esp.osdebug(None)
gc.collect()

ssid = 'faruk'
password = 'farukBD33'

station = network.WLAN(network.STA_IF)

station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())

sensor = dht.DHT11(Pin(14))
i2c = I2C(1,scl=Pin(22), sda=Pin(21), freq=10000)
