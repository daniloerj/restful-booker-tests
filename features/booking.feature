Feature: Booking

  Scenario: Crear una reserva exitosamente
    When creo una reserva con datos válidos
    Then recibo una respuesta de creación exitosa

  Scenario: Obtener una reserva existente
    Given existe una reserva creada
    When consulto la reserva por su id
    Then recibo los datos de la reserva

  Scenario: Actualizar una reserva existente
    Given existe una reserva creada
    When actualizo la reserva con datos válidos
    Then recibo la reserva actualizada

  Scenario: Eliminar una reserva existente
    Given existe una reserva creada
    When elimino la reserva
    Then la reserva ya no existe

  Scenario: Consultar una reserva inexistente
    When consulto una reserva con id inexistente
    Then recibo un error de reserva no encontrada

  Scenario: Actualizar parcialmente una reserva existente
    Given existe una reserva creada
    When actualizo parcialmente la reserva con datos válidos
    Then recibo la reserva parcialmente actualizada

  Scenario: Crear una reserva con datos inválidos
    When creo una reserva con datos inválidos
    Then recibo un error de validación

  Scenario: Actualizar una reserva con token inválido
    Given existe una reserva creada
    When actualizo la reserva con un token inválido
    Then recibo un error de autorización

  Scenario: Eliminar una reserva con token inválido
    Given existe una reserva creada
    When elimino la reserva con un token inválido
    Then recibo un error de autorización

      Scenario: Obtener todos los IDs de reservas
    When consulto todos los IDs de reservas
    Then recibo una lista de IDs de reservas

  Scenario: Obtener IDs de reservas filtrando por nombre y apellido
    Given existe una reserva creada
    When consulto los IDs de reservas filtrando por nombre y apellido
    Then recibo una lista de IDs que incluye la reserva creada

  Scenario: Obtener IDs de reservas con filtro inexistente
    When consulto los IDs de reservas filtrando por nombre inexistente
    Then recibo una lista vacía de IDs