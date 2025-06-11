Feature: Auth

  Scenario: Login exitoso
    When hago login con usuario válido
    Then recibo un token de autenticación