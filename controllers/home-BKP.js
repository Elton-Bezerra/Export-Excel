(function () {
    'use strict';
    app.controller('home', function ($scope, $http, $httpParamSerializerJQLike) {
        $scope.title = "Selecione o arquivo XLS";
        $scope.msg = "";
        let files;

        // Handlers para os arquivos
        function handleFileSelect(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                // Pode-se receber varios arquivos. 
                files = evt.dataTransfer.files; // Objeto FileList
                console.log(files)
                var output = [];
                for (var i = 0, f; f = files[i]; i++) {
                    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                        f.size, ' kb, last modified: ',
                        f.lastModifiedDate.toLocaleDateString(), '</li>');
                }
                document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

            } else {
                swal({
                    title: 'Navegador não suportado: ' + navigator.appVersion,
                    text: 'Atualize seu navegador!',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        }//

        // Handler para Drag and Drop
        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy';
        }
        // Configura a variavel para drag and drop
        var dropZone = document.getElementById('drop-zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);



        //
        $scope.enviarArquivo = function () {
            var arquivoInput = document.getElementById('updload');
            console.log(arquivoInput);
        };


    });
})();

