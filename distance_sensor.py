import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

PIN_TRIGGER = 23
PIN_ECHO = 24

GPIO.setup(PIN_TRIGGER, GPIO.OUT)
GPIO.setup(PIN_ECHO, GPIO.IN)

GPIO.output(PIN_TRIGGER, False)

print("Waiting for sensor to settle")

time.sleep(2)

print("Calculating distance")

GPIO.output(PIN_TRIGGER, True)

time.sleep(0.00001)

# GPIO.output(PIN_TRIGGER, False)


while GPIO.input(PIN_ECHO) == 0:
	print(GPIO.input(PIN_ECHO))
	pulse_start_time = time.time()

while GPIO.input(PIN_ECHO) == 1:
	print(GPIO.input(PIN_ECHO))
	pulse_end_time = time.time()

pulse_duration = pulse_end_time - pulse_start_time

distance = round(pulse_duration * 17150, 2)

print("Distance: " + str(distance))
