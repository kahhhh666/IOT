#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <DHT.h>

// === Configurações WiFi ===
const char* ssid = "SEU_SSID";
const char* password = "SUA_SENHA_WIFI";

// === Configurações HiveMQ Cloud ===
const char* mqtt_server = "b98ee2825a1d4ccfa694e5b1fe5b2ca4.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* mqtt_user = "SEU_USUARIO";
const char* mqtt_pass = "SUA_SENHA";

// Configura sensor DHT
#define DHTPIN 4         // GPIO onde o sensor está conectado
#define DHTTYPE DHT22    // ou DHT11, ajuste conforme seu sensor

DHT dht(DHTPIN, DHTTYPE);

WiFiClientSecure wifiClient;
PubSubClient client(wifiClient);

const char* topic = "sensor/temperatura";

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando em ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  // Aqui pode tratar mensagens recebidas, se quiser
  Serial.print("Mensagem recebida [");
  Serial.print(topic);
  Serial.print("]: ");
  for (unsigned int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando MQTT...");
    if (client.connect("ESP32Client", mqtt_user, mqtt_pass)) {
      Serial.println("conectado");
      client.subscribe(topic);
    } else {
      Serial.print("falha, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 5 segundos");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();

  dht.begin();

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  // Ignorar certificado TLS (testes)
  wifiClient.setInsecure();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  static unsigned long lastSend = 0;
  if (millis() - lastSend > 15000) { // envia a cada 15 segundos
    lastSend = millis();

    float temperature = dht.readTemperature();
    if (isnan(temperature)) {
      Serial.println("Falha na leitura do sensor");
      return;
    }

    char tempStr[8];
    dtostrf(temperature, 1, 2, tempStr);

    client.publish(topic, tempStr);
    Serial.print("Temperatura enviada: ");
    Serial.println(tempStr);
  }
}
