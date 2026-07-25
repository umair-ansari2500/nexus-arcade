import 'package:flutter/material.dart';
import 'home/home.dart';
import 'dart:async';

void main() {
  runApp(const MaterialApp(
    home: Splash_Screen(),
    debugShowCheckedModeBanner: false,
    // change your app title name
    title: "Nexus Arcade",
  ));
}

class Splash_Screen extends StatefulWidget {
  const Splash_Screen({super.key});

  @override
  State<Splash_Screen> createState() => _Splash_ScreenState();
}

class _Splash_ScreenState extends State<Splash_Screen> {
  @override
  void initState() {
    super.initState();
    Timer(
        const Duration(seconds: 5),
        () => Navigator.pushReplacement(context,
            MaterialPageRoute(builder: (context) => const Home_page())));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFF0A0B12),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(
              Icons.gamepad_rounded,
              size: 90,
              color: Color(0xFF00F2FE),
            ),
            SizedBox(height: 16),
            Text(
              "Nexus Arcade",
              style: TextStyle(
                color: Colors.white,
                fontSize: 26,
                fontWeight: FontWeight.bold,
                decoration: TextDecoration.none,
                fontFamily: 'sans-serif',
              ),
            ),
          ],
        ),
      ),
    );
  }
}
