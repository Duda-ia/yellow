// Funcionalidade do Formulário de Contato
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('.contato-form');
    const submitBtn = document.querySelector('.form-submit');
    
    if (form && submitBtn) {
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Envio do formulário
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Função de validação de campo
        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            
            // Remover classes de erro anteriores
            clearFieldError(field);
            
            // Validações específicas
            switch(fieldName) {
                case 'nome':
                    if (value.length < 2) {
                        showFieldError(field, 'Nome deve ter pelo menos 2 caracteres');
                        return false;
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        showFieldError(field, 'E-mail inválido');
                        return false;
                    }
                    break;
                    
                case 'assunto':
                    if (value.length < 3) {
                        showFieldError(field, 'Assunto deve ter pelo menos 3 caracteres');
                        return false;
                    }
                    break;
                    
                case 'mensagem':
                    if (value.length < 10) {
                        showFieldError(field, 'Mensagem deve ter pelo menos 10 caracteres');
                        return false;
                    }
                    break;
            }
            
            return true;
        }
        
        // Função de validação completa do formulário
        function validateForm() {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }
        
        // Mostrar erro no campo
        function showFieldError(field, message) {
            field.classList.add('error');
            
            // Remover mensagem de erro anterior
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Criar nova mensagem de erro
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#ff6b6b';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '0.5rem';
            errorElement.style.fontFamily = 'Space Grotesk, sans-serif';
            
            field.parentNode.appendChild(errorElement);
        }
        
        // Limpar erro do campo
        function clearFieldError(field) {
            field.classList.remove('error');
            
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
        
        // Função de envio do formulário
        function submitForm() {
            // Mostrar estado de loading
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            // Coletar dados do formulário
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simular envio (substitua por sua integração real)
            setTimeout(() => {
                // Aqui você pode integrar com:
                // - Formspree: https://formspree.io/
                // - Netlify Forms: https://docs.netlify.com/forms/setup/
                // - EmailJS: https://www.emailjs.com/
                // - Seu próprio backend
                
                console.log('Dados do formulário:', data);
                
                // Simular sucesso
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                submitBtn.textContent = 'MENSAGEM ENVIADA!';
                
                // Reset do formulário após 3 segundos
                setTimeout(() => {
                    form.reset();
                    submitBtn.classList.remove('success');
                    submitBtn.textContent = 'ENVIAR MENSAGEM';
                    submitBtn.disabled = false;
                }, 3000);
                
            }, 2000);
        }
        
        // Integração com Formspree (exemplo)
        function setupFormspree() {
            // Descomente e configure para usar Formspree
            /*
            form.action = 'https://formspree.io/f/SEU_FORM_ID';
            form.method = 'POST';
            
            // Adicionar campos ocultos se necessário
            const formspreeField = document.createElement('input');
            formspreeField.type = 'hidden';
            formspreeField.name = '_next';
            formspreeField.value = window.location.href + '?success=true';
            form.appendChild(formspreeField);
            */
        }
        
        // Integração com Netlify Forms (exemplo)
        function setupNetlifyForms() {
            // Descomente para usar Netlify Forms
            /*
            form.setAttribute('data-netlify', 'true');
            form.setAttribute('data-netlify-honeypot', 'bot-field');
            
            // Adicionar campo honeypot
            const honeypot = document.createElement('input');
            honeypot.type = 'hidden';
            honeypot.name = 'bot-field';
            form.appendChild(honeypot);
            */
        }
        
        // Integração com EmailJS (exemplo)
        function setupEmailJS() {
            // Descomente e configure para usar EmailJS
            /*
            // Adicionar script do EmailJS no HTML
            // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
            
            // Inicializar EmailJS
            emailjs.init('SEU_USER_ID');
            
            // Função de envio
            function sendEmail() {
                const templateParams = {
                    from_name: data.nome,
                    from_email: data.email,
                    subject: data.assunto,
                    message: data.mensagem
                };
                
                emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        // Mostrar sucesso
                    }, function(error) {
                        console.log('FAILED...', error);
                        // Mostrar erro
                    });
            }
            */
        }
        
        // Verificar se há parâmetro de sucesso na URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            showSuccessMessage();
        }
        
        function showSuccessMessage() {
            // Criar mensagem de sucesso
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.innerHTML = `
                <div style="
                    background-color: #4CAF50;
                    color: white;
                    padding: 1rem;
                    border-radius: 2px;
                    margin-bottom: 2rem;
                    text-align: center;
                    font-family: 'Space Grotesk', sans-serif;
                ">
                    <h3 style="margin: 0 0 0.5rem 0; font-weight: 600;">MENSAGEM ENVIADA COM SUCESSO!</h3>
                    <p style="margin: 0; font-weight: 400;">Obrigado por entrar em contato. Retornaremos em breve.</p>
                </div>
            `;
            
            form.parentNode.insertBefore(successDiv, form);
            
            // Remover mensagem após 5 segundos
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        }
        
        // Animações de entrada
        const formElements = form.querySelectorAll('.form-group');
        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
        
        // Foco automático no primeiro campo
        const firstInput = form.querySelector('input');
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 1000);
        }
    }
    
    // Melhorar acessibilidade
    const labels = document.querySelectorAll('.form-label');
    labels.forEach(label => {
        const input = document.getElementById(label.getAttribute('for'));
        if (input) {
            // Adicionar aria-describedby para melhor acessibilidade
            label.setAttribute('aria-describedby', `${input.id}-description`);
        }
    });
    
    // Adicionar suporte para navegação por teclado
    const focusableElements = form.querySelectorAll('input, textarea, button');
    focusableElements.forEach((element, index) => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.type !== 'textarea') {
                e.preventDefault();
                const nextElement = focusableElements[index + 1];
                if (nextElement) {
                    nextElement.focus();
                }
            }
        });
    });
    
    console.log('Formulário de contato carregado com sucesso!');
}); 