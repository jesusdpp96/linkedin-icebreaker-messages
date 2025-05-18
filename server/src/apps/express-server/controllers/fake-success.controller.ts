import type { Request, Response } from 'express'

/**
 * Handler for fake successful response
 * Returns a predefined successful response
 */
export const fakeSuccessHandler = (req: Request, res: Response) => {
  // Get the original request data for reference
  const { senderUrl, problemDescription, solutionDescription, receiverUrl } = req.body

  setTimeout(() => {
    // Return a successful response
    res.status(200).json({
      status: 'success',
      data: [
        {
          message:
            'Hola Florencia, coincidimos en la importancia de construir culturas centradas en las personas y basadas en datos. En MTLempresas ayudamos a optimizar procesos de RRHH con evaluaciones psicométricas, ¿te interesaría explorar cómo podemos potenciar tus estrategias de talento?',
          templateTitle: 'Referencia a contacto en común',
          templateCategory: 'Conexión',
          instruction:
            'Antes de enviar, dale like a su post reciente sobre formación de equipos tech para mostrar interés.',
          sourcePosts: [
            'https://www.linkedin.com/feed/update/urn:li:activity:7326247788617379842/',
          ],
          receiverName: 'Florencia Diaz',
          receiverProfilePicture:
            'https://media.licdn.com/dms/image/v2/D4D03AQERV6DyIZn7vA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1665872050580?e=1752105600&v=beta&t=_c8Dda3NO21BUqi2J_apLWscWYgx5Yfd2Ay7hfcJ8pE',
          receiverHeadline:
            'Driving personal and business transformation and growth | \nCorporate & startup experience | Data powered decisions | Culture architect | Human centric approach',
          senderName: 'Salvador Burgos Ermácora',
          senderProfilePicture:
            'https://media.licdn.com/dms/image/v2/C4E03AQHt5-VO_o6ilQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1627934648427?e=1752105600&v=beta&t=yQIsVSn8IE06mwp-bVdGxoW9x-KSsaPq387ZlAK74O8',
          senderHeadline:
            'Entrepreneurship Enthusiast | SquadS Ventures | MTLempresas | Co-Director @Xplora UCEMA',
        },
        {
          message:
            'Hola Florencia, vi que liderás Teamcubation con un enfoque humano y tecnológico que admiro. En MTLempresas trabajamos en evaluación de habilidades blandas para mejorar selección y retención. ¿Cómo ves el impacto de estas evaluaciones en la transformación cultural?',
          templateTitle: 'Pregunta sobre un post',
          templateCategory: 'Pregunta',
          instruction:
            'Comenta en su post sobre formación de equipos y luego envía este mensaje para que te reconozca.',
          sourcePosts: [
            'https://www.linkedin.com/feed/update/urn:li:activity:7313873886813544448/',
          ],
          receiverName: 'Florencia Diaz',
          receiverProfilePicture:
            'https://media.licdn.com/dms/image/v2/D4D03AQERV6DyIZn7vA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1665872050580?e=1752105600&v=beta&t=_c8Dda3NO21BUqi2J_apLWscWYgx5Yfd2Ay7hfcJ8pE',
          receiverHeadline:
            'Driving personal and business transformation and growth | \nCorporate & startup experience | Data powered decisions | Culture architect | Human centric approach',
          senderName: 'Salvador Burgos Ermácora',
          senderProfilePicture:
            'https://media.licdn.com/dms/image/v2/C4E03AQHt5-VO_o6ilQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1627934648427?e=1752105600&v=beta&t=yQIsVSn8IE06mwp-bVdGxoW9x-KSsaPq387ZlAK74O8',
          senderHeadline:
            'Entrepreneurship Enthusiast | SquadS Ventures | MTLempresas | Co-Director @Xplora UCEMA',
        },
        {
          message:
            'Hola Florencia, felicitaciones por tu rol en Teamcubation y por impulsar la formación de talento tech. En MTLempresas estamos enfocados en mejorar la selección y desarrollo del talento con datos objetivos. ¿Te gustaría conversar sobre cómo podemos apoyar tu crecimiento?',
          templateTitle: 'Felicitar por nuevo rol',
          templateCategory: 'Felicitación',
          instruction:
            'Dale like a su post anunciando oportunidades laborales para talentos tech antes de enviar el mensaje.',
          sourcePosts: [
            'https://www.linkedin.com/feed/update/urn:li:activity:7285323795354021888/',
          ],
          receiverName: 'Florencia Diaz',
          receiverProfilePicture:
            'https://media.licdn.com/dms/image/v2/D4D03AQERV6DyIZn7vA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1665872050580?e=1752105600&v=beta&t=_c8Dda3NO21BUqi2J_apLWscWYgx5Yfd2Ay7hfcJ8pE',
          receiverHeadline:
            'Driving personal and business transformation and growth | \nCorporate & startup experience | Data powered decisions | Culture architect | Human centric approach',
          senderName: 'Salvador Burgos Ermácora',
          senderProfilePicture:
            'https://media.licdn.com/dms/image/v2/C4E03AQHt5-VO_o6ilQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1627934648427?e=1752105600&v=beta&t=yQIsVSn8IE06mwp-bVdGxoW9x-KSsaPq387ZlAK74O8',
          senderHeadline:
            'Entrepreneurship Enthusiast | SquadS Ventures | MTLempresas | Co-Director @Xplora UCEMA',
        },
      ],
    })
  }, 2000) // Simulate a delay of 2 seconds
}
