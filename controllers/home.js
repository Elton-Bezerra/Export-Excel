(function () {
    'use strict';
    app.controller('home', ['$scope', '$http', '$httpParamSerializerJQLike',
        function ($scope, $http, $httpParamSerializerJQLike) {
            $scope.title = 'Eviar arquivo';
            
            var input = document.getElementById('upload');;// input tag
            var dropbox = document.getElementById('dropbox'); // drag and drop area
            var preview = document.getElementById('preview');
            

            input.style.visibility = 'hidden';
            input.addEventListener('change', fileReceive);

            dropbox.addEventListener("dragenter", dragenter, false);
            dropbox.addEventListener("dragover", dragover, false);
            dropbox.addEventListener("dragleave", dragleave, false);
            dropbox.addEventListener("drop", drop, false);

            

            function fileReceive() {
                input = document.getElementById('upload');
                let planilha = input.files[0];
                if (planilha.lenght === 0 || !planilha) {
                    preview.innerHTML = 'Nehum arquivo selecionado!';
                    return;
                }
                fileHandler(planilha);
            }

            // MANIPULAR INFOS DO ARQUIVO
            function fileHandler(planilha) {
                var form    = document.querySelector('form');
                let extensaoArquivo = (planilha.name.substring(planilha.name.lastIndexOf("."))).toLowerCase();

                if (extensaoArquivo != ".xls" && extensaoArquivo != ".xlsx") {
                    preview.innerHTML = '<p class="alert alert-danger">A extensão <strong>' + extensaoArquivo + '</strong> não é suportada!</p>';
                    setTimeout(function () {
                        preview.innerHTML = '';
                    }, 3000);
                    return;
                }

                preview.innerHTML = `
                    <p><strong>Arquivo:</strong> ${planilha.name}</p>
                    <p><strong>Tamanho:</strong> ${returnFileSize(planilha.size)}</p>
                    <p><strong>Data de modificação:</strong> ${new Date(planilha.lastModified).toLocaleDateString()}</p>
                `;

                swal({
                    title: 'Enviar arquivo?',
                    text: 'deseja enviar o arquivo' + (planilha.name).toUpperCase() + ' ?',
                    type: 'warning',
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonColor: '#0088cc',
                    cancelButtonColor: '#a94442'

                })
                    .then((result) => {
                        sendFile(planilha);
                        preview.innerHTML += '<p class="alert alert-warning" id="alerta"><strong>Arquivo a ser enviado!</strong></p>';
                        setTimeout(function () {
                            preview.innerHTML = `
                                <p><strong>Arquivo:</strong> ${planilha.name}</p>
                                <p><strong>Tamanho:</strong> ${returnFileSize(planilha.size)}</p>
                                <p><strong>Data de modificação:</strong> ${new Date(planilha.lastModified).toLocaleDateString()}</p>
                            `;
                        }, 3000);

                    }, (error) => {
                        preview.innerHTML = '<p class="alet alert-danger">Envio cancelado</p>';
                        setTimeout(function () {
                            preview.innerHTML = '';
                        }, 3000);

                    });
            }
            // ENVIAR ARQUIVO
            function sendFile(planilha) {
                var data = new FormData(document.querySelector('form'));
                if(planilha) {
                    data.append('upload', planilha);
                }

                $.ajax({
                    url: 'api/ExcelToDB',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    method: 'POST',
                    type: 'POST',
                    success: function (res) {
                        console.log(res);
                        data = null;
                    }
                });
            }

            function returnFileSize(number) {
                if (number < 1024) {
                    return number + 'bytes';
                } else if (number > 1024 && number < 1048576) {
                    return (number / 1024).toFixed(1) + 'KB';
                } else if (number > 1048576) {
                    return (number / 1048576).toFixed(1) + 'MB';
                }
            }

            function drop(e) {
                e.stopPropagation();
                e.preventDefault();
                let files = e.dataTransfer.files[0];
                $('#dropbox').css({
                    "box-shadow" : "0px 0px 0px grey"
                });
                fileHandler(files);
            }

            function dragenter(e) {
                e.stopPropagation();
                e.preventDefault();
                
            }

            function dragleave(e){
                e.stopPropagation();
                e.preventDefault();
                $('#dropbox').css({
                    "box-shadow" : "0px 0px 0px grey"
                });
            }

            function dragover(e) {
                e.stopPropagation();
                e.preventDefault();
                $('#dropbox').css({
                    "box-shadow" : "1px 1px 21px grey"
                });
                e.dataTransfer.dropEffect = 'copy';
            }

            /**
             *  adiciona evento de click no dropbox area 
             *  e aciona o botão para seleção de arquivos.
             */
            dropbox.onclick = function () {
                let inputFile = document.getElementById('upload');
                inputFile.click();
            };

        }]);////
})();