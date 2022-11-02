import Image from 'next/image'
import appPreviewImg from '../assets/aplicacao-trilha-ignite.png'
import logoImage from '../assets/logo.svg'
import usersAvatarsImg from '../assets/avatares.png'
import iconCheck from '../assets/icon.png'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps{
  pollcount: number
  guesscount: number
  usercount: number
}


export default function Home(props: HomeProps) {

  const [pollTitle, setPollTitle] = useState('')

  async function createPoll(event: FormEvent){
    event.preventDefault()

    try {
      const response = await api.post('/polls', {
        title: pollTitle,
      });
    
      const {code} = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência!')

      setPollTitle("")
    
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o bolão, tente novamente!')
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
        <Image 
        src={logoImage}
        alt="NLW Copa"
        quality={100}
        />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe com seus amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image
          src={usersAvatarsImg}
          alt=""
          quality={100}
          />

          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.usercount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPoll} className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type="text"
            required
            placeholder='Qual o nome do seu bolão?'
            onChange={event => setPollTitle(event.target.value)}
            value={pollTitle}
          />
          <button
            className='px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'
        >
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image
              src={iconCheck}
              alt=""
            />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.pollcount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'/>

          <div className='flex items-center gap-6'>
            <Image
              src={iconCheck}
              alt=""
            />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guesscount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} 
      alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW copa"
      quality={100}
      />
    </div>
  )
}
 export const getStaticProps = async () => {

  const [pollCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('polls/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      pollcount: pollCountResponse.data.count,
      guesscount: guessCountResponse.data.count,
      usercount: userCountResponse.data.count
    }
  }
 }