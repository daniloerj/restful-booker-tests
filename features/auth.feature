Feature: Auth

  Scenario: Login exitoso
    When hago login con usuario válido
    Then recibo un token de autenticación

  Scenario: Login fallido
    When hago login con usuario inválido
    Then recibo un error de autenticación