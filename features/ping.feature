Feature: Ping

  Scenario: El API responde correctamente al ping
    When consulto el endpoint de ping
    Then recibo una respuesta exitosa

  Scenario: El API no responde al ping (simulado)
    When consulto el endpoint de ping en una URL inválida
    Then recibo un error de conexión

      Scenario: El endpoint de ping responde rápido
    When consulto el endpoint de ping
    Then la respuesta llega en menos de 500 ms