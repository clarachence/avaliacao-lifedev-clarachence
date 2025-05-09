import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Sobre o Mini Blog</h1>
      <p>
        O Mini Blog é uma plataforma de compartilhamento de conteúdo onde os usuários podem criar,
        compartilhar e interagir com posts sobre diversos temas.
      </p>
      <div className={styles.features}>
        <h2>Principais Funcionalidades</h2>
        <ul>
          <li>Criação de posts com título e conteúdo personalizado</li>
          <li>Sistema de autenticação seguro</li>
          <li>Dashboard pessoal para gerenciar suas publicações</li>
          <li>Interface intuitiva e moderna</li>
        </ul>
      </div>
      <div className={styles.tech}>
        <h2>Tecnologias Utilizadas</h2>
        <ul>
          <li>React.js para a interface do usuário</li>
          <li>Firebase para autenticação e banco de dados</li>
          <li>CSS Modules para estilização</li>
        </ul>
      </div>
    </div>
  )
}

export default About