import qrcode

# Lista de links
links = [
    "hyperlink here",
    "another hyperlink here"
    # Adicione os demais links aqui
]

numero_inicial = 2252

# Loop para criar um QR code para cada link na lista
for i, link in enumerate(links):
    qr = qrcode.QRCode(version=1,
                       error_correction=qrcode.constants.ERROR_CORRECT_L,
                       box_size=20,
                       border=2)
    
    qr.add_data(link)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    # Salva o QR code com um nome sequencial
    numero_arquivo = numero_inicial + i
    nome_arquivo = f"qr-codes/qr_images/{numero_arquivo}.png"
    img.save(nome_arquivo)
