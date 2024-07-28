       // teste
       
        const contentArray = [
          
            "I - Introdução (Balão Verde)",
    "Seja bem-vindo ao Treinamento de Finalização.",
    "Após este treinamento, caso seja aprovado(a), você receberá a sigla TF.",
    "Fique atento aos tópicos, haverá perguntas ao final do treinamento.",
    "Dúvidas?",
    "II - Team Speak³ (Balão Verde)",
    "O TeamSpeak é a principal ferramenta de comunicação do Exército Brasileiro.",
    "Ao auxiliar treinamentos, é importante que você esteja conectado ao nosso Team Speak,", "facilitando assim a comunicação entre você e o treinador, evitando também que haja imprevistos.",
    "Caso não tenha, procure um Ajudante no Quartel General para que possa instalar o aplicativo corretamente.",
    "Os Ajudantes utilizam uma medalha azul, caso encontre um, comunique-o.",
    "Dúvidas?",
    "III - Relatórios (Balão Verde)",
    "Ao se tornar Sargento, você precisará aplicar o treinamento e realizar os relatórios caso não haja um Aluno para lhe auxiliar.",
    "Mas por enquanto, sempre que for auxiliar um treinamento, você obrigatoriamente precisa realizar o relatório referente ao treino.",
    "Vamos reforçar alguns pontos vistos no seu Treinamento Complementar II:",
    "Esteja atento ao Oficial que estiver em MQG ou àquele que enviar o treinamento. Ele será o Oficial responsável.",
    "Verifique duas vezes o nick dos treinados antes de enviar o relatório.",
    "Esteja atento ao horário de reprovação dos treinados, caso haja algum", "O horário de reprovação será o mesmo do término do treinamento, caso tenha somente um treinado.",
    "Não se esqueça de responder às 4 perguntas no campo de Observações: 1. Como foi o treinamento? 2.", "Como é a ortografia do treinador? 3. Como foi a atitude do treinador? e 4. Houve algo anormal no treinamento?",
    "Alguma dúvida sobre o preenchimento do relatório?",
    "IV - Auxílio de treinamentos (Balão Verde)",
    "Os Alunos da EsSA podem auxiliar os Treinamentos Básicos I e II (T1 e T2)", "e também o Treinamento Complementar I (T3).",
    "Além de realizar os relatórios de treinamento, você deverá amparar o treinador no que for necessário.",
    "Por exemplo, ele pode solicitar que você simule um alistamento durante o T1", "ou o ajude a demonstrar o funcionamento do PDV durante o T3.",
    "Portanto, esteja sempre atento aos treinamentos e seja solícito com o que lhe for pedido pelo treinador.",
    "Não se esqueça de manter uma postura e comportamentos exemplares durante os treinamentos", "como um Auxiliar e um futuro treinador.",
    "Dúvidas?",
    "VII - Perguntas (Balão Verde)",
    "1. Qual a ferramenta de comunicação que utilizamos no Exército Brasileiro?",
    "2. Quais treinamentos podem ser auxiliados pelos Alunos da EsSA?",
    "3. Quantas perguntas o auxiliar precisa responder nas observações?",
    "VIII - Finalização (Balão Verde)",
    "Parabéns, você foi aprovado no Treinamento de Finalização!",
    "Tenha em mente que para a aprovação na EsSA, você terá que auxiliar treinamentos para adquirir experiência", "e com isso, capacidade para se tornar Sargento.",
    "Altere a sigla Tc2 para TF em sua missão, por gentileza."
];

        const container = document.getElementById('container');
        const alertBox = document.getElementById('alert');
        const copyPreviousButton = document.getElementById('copyPrevious');
        const copyNextButton = document.getElementById('copyNext');
        const startAutoCopyButton = document.getElementById('startAutoCopy');
        const stopAutoCopyButton = document.getElementById('stopAutoCopy');

        let autoCopyInterval;

        contentArray.forEach((paragraph, index) => {
          const p = document.createElement('p');
          p.className = 'paragraph';
          if (paragraph.includes('(Balão Verde)')) {
            p.classList.add('balao-verde');
          }
          p.dataset.index = index;
          p.innerText = paragraph;
          container.appendChild(p);
        });

        const paragraphs = document.querySelectorAll('.paragraph');

        function copyText(index) {
          if (index < 0 || index >= paragraphs.length) return;

          const textToCopy = paragraphs[index].innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            paragraphs.forEach(p => p.classList.remove('copied'));
            paragraphs[index].classList.add('copied');

            // Scroll to center the paragraph
            const containerHeight = container.clientHeight;
            const paragraphOffsetTop = paragraphs[index].offsetTop;
            const paragraphHeight = paragraphs[index].offsetHeight;
            const scrollTop = paragraphOffsetTop - (containerHeight / 2) + (paragraphHeight / 2);
            container.scrollTo({ top: scrollTop, behavior: 'smooth' });

            // Show alert if paragraph contains "(Balão Verde)"
            if (paragraphs[index].classList.contains('balao-verde')) {
              showAlert();
              clearInterval(autoCopyInterval); // Stop the timer if "(Balão Verde)" is found
            }
          }).catch(err => console.error('Failed to copy text: ', err));
        }

        function showAlert() {
          alertBox.style.display = 'block';
          setTimeout(() => {
            alertBox.style.display = 'none';
            enableButtons();
          }, 3000);
        }

        function enableButtons() {
          copyPreviousButton.disabled = false;
          copyNextButton.disabled = false;
        }

        let currentIndex = 0;

        copyPreviousButton.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex--;
            copyText(currentIndex);
          }
        });

        copyNextButton.addEventListener('click', () => {
          if (currentIndex < paragraphs.length - 1) {
            currentIndex++;
            copyText(currentIndex);
          }
        });

        startAutoCopyButton.addEventListener('click', () => {
          autoCopyInterval = setInterval(() => {
            if (currentIndex < paragraphs.length - 1) {
              currentIndex++;
              copyText(currentIndex);
            } else {
              clearInterval(autoCopyInterval);
            }
          }, 6000);
        });

        stopAutoCopyButton.addEventListener('click', () => {
          clearInterval(autoCopyInterval);
        });

        // Copia automaticamente o primeiro parágrafo ao carregar a página
        window.onload = () => {
          copyText(currentIndex);
        };