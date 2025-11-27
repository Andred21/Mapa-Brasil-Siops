export default function About() {
  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-6 pb-10 pt-16 text-gray-800 mt-20">
      <div className="w-full max-w-5xl rounded-3xl border border-emerald-100 bg-white/80 p-10 shadow-xl backdrop-blur mb-10">

        <h1 className="mb-6 text-4xl font-extrabold text-emerald-800 tracking-tight">
          Sobre o <span className="text-emerald-600">Mapa Siops</span>
        </h1>

        <div className="space-y-5 text-lg leading-relaxed text-gray-700">
          <p>
            O <strong>Mapa Siops</strong> é uma aplicação interativa desenvolvida
            para facilitar o acompanhamento de indicadores municipais e
            estaduais disponibilizados por órgãos públicos, como o{" "}
            <strong>Ministério da Fazenda</strong> e o{" "}
            <strong>Ministério da Saúde</strong>. Através de uma visualização
            geográfica moderna, você pode explorar os estados, visualizar dados
            populacionais e compreender a evolução demográfica ao longo dos anos.
          </p>

          <p>
            O painel principal apresenta o mapa do Brasil com destaque para cada
            Unidade Federativa. Ao selecionar um estado ou município, o painel
            lateral exibe informações detalhadas — como população, códigos
            oficiais e vínculos administrativos — permitindo cruzar dados
            geoespaciais com indicadores socioeconômicos de forma intuitiva.
          </p>

          <p>
            A aba <strong>“Pesquisar”</strong> foi criada para proporcionar acesso
            rápido às informações. Basta digitar o nome de um município para
            visualizar seus dados consolidados e navegar pelos anos disponíveis.
            Esse recurso complementa o mapa e agiliza a análise de profissionais
            que precisam localizar e comparar diferentes entes federativos.
          </p>
        </div>

        <h2 className="mt-10 mb-3 text-2xl font-semibold text-emerald-800 border-l-4 border-emerald-400 pl-3">
          O que é o SIOPS?
        </h2>

        <div className="space-y-5 text-lg leading-relaxed text-gray-700">
          <p>
            O <strong>Sistema de Informações sobre Orçamentos Públicos em Saúde</strong>{" "}
            (<strong>SIOPS</strong>) é uma plataforma oficial do{" "}
            <strong>Ministério da Saúde</strong> que coleta e divulga dados sobre
            os gastos públicos em saúde de todos os estados e municípios do Brasil.
            Criado em conformidade com a{" "}
            <strong>Lei Complementar nº 141/2012</strong>, o SIOPS garante
            transparência e controle social sobre o uso dos recursos destinados à
            saúde, em sintonia com os princípios da{" "}
            <strong>Lei de Acesso à Informação (Lei nº 12.527/2011)</strong>.
          </p>

          <p>
            Por meio do SIOPS, cidadãos, gestores e pesquisadores podem acompanhar
            quanto cada ente federativo aplica em ações e serviços públicos de
            saúde, promovendo fiscalização e eficiência na gestão dos recursos. Os
            dados extraídos desse sistema são a base dos indicadores apresentados
            no Mapa Siops.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 border-t border-emerald-100 pt-4">
            <a
              href="https://www.gov.br/saude/pt-br/acesso-a-informacao/siops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-medium underline underline-offset-4 hover:text-emerald-900 transition-colors"
            >
              Saiba mais sobre o SIOPS →
            </a>
            <a
              href="https://siops-consulta-publica-api.saude.gov.br/swagger-ui/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-0 text-emerald-600 text-sm underline underline-offset-4 hover:text-emerald-800 transition-colors"
            >
              Consultar API pública do SIOPS
            </a>
          </div>
        </div>

        <h2 className="mt-10 mb-3 text-2xl font-semibold text-emerald-800 border-l-4 border-emerald-400 pl-3">
          Transparência e Dados Abertos
        </h2>

        <div className="space-y-5 text-lg leading-relaxed text-gray-700">
          <p>
            Este projeto utiliza exclusivamente dados públicos obtidos de fontes
            oficiais do governo federal, com base na política de{" "}
            <strong>transparência ativa</strong> prevista na Lei de Acesso à
            Informação. Ao consolidar esses dados em uma interface interativa, o{" "}
            <strong>Mapa Siops</strong> reforça o compromisso com o controle
            social e o acesso aberto à informação.
          </p>

          <p>
            Continue explorando os painéis, compare diferentes regiões e descubra
            como o investimento público e os indicadores populacionais evoluem
            pelo país. Sua interação é essencial para aprimorar este projeto e
            incentivar o uso inteligente e transparente de dados públicos.
          </p>
        </div>
      </div>
      <div className="mb-10">

      </div>
    </div>
  );
}
