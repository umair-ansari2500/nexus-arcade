import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:connectivity/connectivity.dart';

void main() {
  runApp(const MaterialApp(
    home: Home_page(),
    debugShowCheckedModeBanner: false,
    title: "Nexus Arcade",
  ));
}

class Home_page extends StatefulWidget {
  const Home_page({super.key});

  @override
  State<Home_page> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<Home_page> {
  late WebViewController _webViewController;
  // Nexus Arcade Web App Portal URL
  var url = "https://nexus-arcade-delta.vercel.app";
  double webProgress = 0;

  final Connectivity _connectivity = Connectivity();
  bool isConnected = true;

  @override
  void initState() {
    super.initState();
    _connectivity.onConnectivityChanged.listen((result) {
      setState(() {
        isConnected = (result != ConnectivityResult.none);
      });

      if (isConnected) {
        _webViewController.reload();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        margin: const EdgeInsets.symmetric(vertical: 24.5),
        child: WillPopScope(
            onWillPop: () async {
              if (await _webViewController.canGoBack()) {
                _webViewController.goBack();
                return false;
              } else {
                return true;
              }
            },
            child: Column(
              children: [
                webProgress < 1
                    ? const SizedBox(
                        height: 5.0,
                        child: LinearProgressIndicator(
                          backgroundColor: Colors.white,
                          color: Color.fromARGB(255, 250, 134, 56),
                        ),
                      )
                    : const SizedBox(),
                Expanded(
                  child: isConnected
                      ? WebView(
                          initialUrl: url,
                          zoomEnabled: false,
                          javascriptMode: JavascriptMode.unrestricted,
                          onWebViewCreated: (WebViewController controller) {
                            _webViewController = controller;
                          },
                          onProgress: (progress) => setState(() {
                            webProgress = progress / 100;
                          }),
                        )
                      : const Center(
                          child: Text(
                              "No internet connection. Please check your network."),
                        ),
                ),
              ],
            )),
      ),
    );
  }
}
