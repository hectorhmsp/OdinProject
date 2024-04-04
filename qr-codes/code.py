import qrcode

# Lista de links
links = [
    "https://drive.google.com/drive/folders/1-c4_7ILVvJbOOdSblRwUCTIQiX5_YNVL",
    "https://drive.google.com/drive/folders/1Wqd1LdIpA5kW7jkewKwnGdAdRSXWe3pW",
    "https://drive.google.com/drive/folders/1zvbNJ0UusWKW4j-RIVdJ7WL7GiAgN4QJ",
    "https://drive.google.com/drive/folders/1QO_wi5mEKOLRxoDCSTQAj-GoagUEkp6G",
    "https://drive.google.com/drive/folders/1lO81FZ5c48yzccB7ykzYMoc6QPTMopJC",
    "https://drive.google.com/drive/folders/1ZTgA9rF1W9_9sf73AIy1t6oCfoLwjrOD",
    "https://drive.google.com/drive/folders/1O62xBENyL5AvnE4TUGXKQ78nzzWRYhRC",
    "https://drive.google.com/drive/folders/1o9ikcm6eSjDWmgfPgquuNR-xVTl8v-Rb",
    "https://drive.google.com/drive/folders/1f1JNijvtR69S_T6ZQ4CMamPikO_1m9f9",
    "https://drive.google.com/drive/folders/11omKtrcy_I_nGWXorykmbdNHtnMnauHs",
    "https://drive.google.com/drive/folders/1UcEex91ybbB0__g_Eg1ajief-RhGfASd",
    "https://drive.google.com/drive/folders/1CZIy8JQ9v1L7lkpPf-XqVcJhBNcerIKn",
    "https://drive.google.com/drive/folders/1bvK6GElz1Vma0hn-r_j6EJC6dF82Xy0m",
    "https://drive.google.com/drive/folders/1Ly3mKSV4tmhiz3Ypq3R5OipELANnmmsj",
    "https://drive.google.com/drive/folders/1g0Ff_xnn64bLrzrlrVovx6fMY69eSunD",
    "https://drive.google.com/drive/folders/1Pvd6jr7yEvUyNboTYkR6bZWJNEE4N9sD",
    "https://drive.google.com/drive/folders/1M-6HmPGOxfwuMF_2wEx7YV-YAw9r22tY",
    "https://drive.google.com/drive/folders/1iPu928zPRl95-CL-3vxubi3FyjVNlcir",
    "https://drive.google.com/drive/folders/14l2qC20jLudBpaWDNjDJWoliB_xw0rod",
    "https://drive.google.com/drive/folders/1VEakfBbET6uLA2haQG9HJw6pVHlD5ZEY",
    "https://drive.google.com/drive/folders/1qabJdy9VoMiPUAVySbG_q-G9u3mr_Fyv",
    "https://drive.google.com/drive/folders/1Az2Qk_3Vu6EE_dUSg4ULZDL0cP7FPq9L",
    "https://drive.google.com/drive/folders/1U5CeCssVBuxsAvRiWxI18IxDWC2TDnz1",
    "https://drive.google.com/drive/folders/1CyhXZvaU9qABihMDLo3WZa1T5cEA3nHb",
    "https://drive.google.com/drive/folders/1zRytH4RvHFNRFFNBj31qHFoxz00pxGI1",
    "https://drive.google.com/drive/folders/1l0iPf87EIDkQMoTG37dAPM8XVY0d4qpl",
    "https://drive.google.com/drive/folders/1fvEJ8f2UUkdLyWxiU-qP_mUOK5M2N-N2",
    "https://drive.google.com/drive/folders/13lFMFt7JtL0TCrQjayjnSRgxyf4jdiKl",
    "https://drive.google.com/drive/folders/1jYMeXSY9e4odnvOVotIG5kdJP3YGRKxM",
    "https://drive.google.com/drive/folders/1or_29sXS7oOfWPmyc1R44TPDIJca-w6W",
    "https://drive.google.com/drive/folders/1nFRCHvbFwbOvywPDlnNwz6C2wNibqSWE",
    "https://drive.google.com/drive/folders/1fbtNJ_F9CAkq-H1JKtOxN2diz28TqMJo",
    "https://drive.google.com/drive/folders/1VbAQi1ACGNgZaJD3IfXmarrI8858ezyW",
    "https://drive.google.com/drive/folders/1q5AAWZSiJoGPaWr5s-QRPaTTH8gkY5-T",
    "https://drive.google.com/drive/folders/15LjJDvoMg_C-zD82N4gogmcKEoBS9tU7",
    "https://drive.google.com/drive/folders/1K3Phyq3l2XC1jLpUqWieuWdfovVcwuOH",
    "https://drive.google.com/drive/folders/1JUJ-VqQ2FkVnK24zDpPmw-4MGFn3WocE",
    "https://drive.google.com/drive/folders/1wb20Sx_5YM9Q42a2Ggji6jEzF_F_2vRr",
    "https://drive.google.com/drive/folders/1m0uQqB_Y69shZflyqghfwnSqBSPf6SRL",
    "https://drive.google.com/drive/folders/1snKFNH_IkDTtUawQITM2PGylBmYLaN9A",
    "https://drive.google.com/drive/folders/1VtsCh0jwnKovUKUcoYvsHKrtR9z2XoMH",
    "https://drive.google.com/drive/folders/1HMffBm4wvwEtIHXFUpJFERLQITs0_Te8",
    "https://drive.google.com/drive/folders/1M37hH5SwMZLMqx-CwDK9t6vqVJp9B1EI",
    "https://drive.google.com/drive/folders/1OGOudetXPayH2kHmeLXraP9oM_G2SHmf",
    "https://drive.google.com/drive/folders/1QLH2JLDa14a_IubEEw8gAt_wn3VUsDJT",
    "https://drive.google.com/drive/folders/1P6YJlGFZaOJurpo83avJVKTcFas8bOpk",
    "https://drive.google.com/drive/folders/1JvuOz8BeCwA5iIGfSUQ9CEZp0djCkruN",
    "https://drive.google.com/drive/folders/1RK-Hc_nxCT5hXuouZ051Fmjgs_uwKKdy",
    "https://drive.google.com/drive/folders/1cs8pcFYjTEmwvymujravOZ8aaMHznwTq",
    "https://drive.google.com/drive/folders/1t7Cu97UlgNv6P8itODpfsL5D1ZXzS4pM",
    "https://drive.google.com/drive/folders/1cdIAYsoY5Px6DnrkldDaG5dt-icAurlO",
    "https://drive.google.com/drive/folders/1warpduLSBtRqcui77fKIQl2cYKA7hbxG",
]

# Número inicial para os arquivos de QR code
numero_inicial = 2251

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
    nome_arquivo = f"qr-codes/all-qr-codes/qr-code_{numero_arquivo}.png"
    img.save(nome_arquivo)


