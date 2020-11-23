#include <Servo.h>

Servo servoLeft;
Servo servoRight;
int speed_default = 1500;
int speed = 20;
int peed = 5;


void setup()
{

    pinMode(7, INPUT);

    pinMode(5, INPUT);
    pinMode(8, OUTPUT);
    pinMode(2, OUTPUT);
    tone(4, 3000, 1000);

    delay(1000);

    servoLeft.attach(13);

    servoRight.attach(12);



   
}
void loop()
{
    byte wLeft = digitalRead(5);
    byte wRight = digitalRead(7);
    if ((wLeft == 0) && (wRight == 0))
    {
        digitalWrite(8, HIGH);
        digitalWrite(2, HIGH);
        backward(1000);

        turnLeft(800);
    }

    else if (wLeft == 0)
    {
        digitalWrite(8, HIGH);
        digitalWrite(2, LOW);
        if (speed < 150)
        {
            servoLeft.writeMicroseconds(1700);
            servoRight.writeMicroseconds(1450 - speed);
            delay(4000);
        }
    }

    else if (wRight == 0)
    {
        digitalWrite(8, LOW);
        digitalWrite(2, HIGH);
        if (peed < 10)
        {
            servoLeft.writeMicroseconds(1700);
            servoRight.writeMicroseconds(1490 + peed);
        }
        else
        {
            servoLeft.writeMicroseconds(1700);
            servoRight.writeMicroseconds(1490);
        }
        delay(1000);
    }
    else
    {
        forward(20);
    }
}

void forward(int time)
{

    servoLeft.writeMicroseconds(1700);

    servoRight.writeMicroseconds(1450);

    delay(time);
}

void turnLeft(int time)
{

    servoLeft.writeMicroseconds(1300);

    servoRight.writeMicroseconds(1420);

    delay(time);
}

void turnRight(int time)
{

    servoLeft.writeMicroseconds(1700);

    servoRight.writeMicroseconds(1490);

    delay(time);
}

void backward(int time)
{

    servoLeft.writeMicroseconds(1300);

    servoRight.writeMicroseconds(1700);

    delay(time);
}