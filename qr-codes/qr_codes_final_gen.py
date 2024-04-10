from PIL import Image, ImageDraw, ImageFont
import qrcode

phone_number_font_size = 20
website_link_font_size = 12

# Carregar as fontes com os tamanhos desejados
phone_number_font = ImageFont.truetype("arialbd.ttf", phone_number_font_size)
website_link_font = ImageFont.truetype("arialbd.ttf", website_link_font_size)
font = ImageFont.truetype("arialbd.ttf", 15)

# Lista de links
links = [
    "hyperlink goes here",
    "next hyperlink"
]

logo_path = "qr-codes/logo.png"
phone_number = "(51) 3465.5513"
website_link = "www.mpautomacao.com.br"

# Número inicial para os arquivos de QR code
numero_inicial = '''your number here'''

# Loop para criar um QR code para cada link na lista
for i, link in enumerate(links):
    qr = qrcode.QRCode(version=1,
                       error_correction=qrcode.constants.ERROR_CORRECT_L,
                       box_size=10,
                       border=0)
    
    qr.add_data(link)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img_resized = img.resize((100,100))
    
    # Carregar a imagem do logo
    logo = Image.open(logo_path)

    # Definir o tamanho da imagem do logo (50x50)
    logo_size = (130, 273)
    logo.thumbnail(logo_size)

    # Definir o tamanho da imagem final
    width = 170
    height = 283  # Adicionando espaço para o número de telefone, link do site e "PAINEL"
    combined_image = Image.new("RGB", (width, height), "white")

    # Colar o logo no canto superior esquerdo
    combined_image.paste(logo, (20, 0))

    # Adicionar o número de telefone
    draw = ImageDraw.Draw(combined_image)
    # Calcular a largura do texto
    text_width = draw.textlength(phone_number, font=phone_number_font)
    # Adicionar o número de telefone
    draw.text(((width - text_width) // 2, logo.height + 3), phone_number, fill="#191970", font=phone_number_font)

    # Adicionar o link do site
    link_width = draw.textlength(website_link, font=website_link_font)
    draw.text(((width - link_width) // 2, logo.height + 28), website_link, fill="#191970", font=website_link_font)

    # Colar o QR Code
    combined_image.paste(img_resized, ((width - img_resized.width) // 2, logo.height + 52))

    # Adicionar o texto "PAINEL" na parte inferior
    numero_arquivo = numero_inicial + i
    draw.text((33,250), f"PAINEL - {numero_arquivo}", fill="black", font=font)

    # Salva o QR code com um nome sequencial
    nome_arquivo = f"qr-codes/qr_images/{numero_arquivo}.png"
    combined_image.save(nome_arquivo)