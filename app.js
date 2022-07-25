const PDF_DOCUMENT = require('pdfkit')
const fs = require('fs')
const express = require('express')
const http = require('http')
const app = express()
const doc = new PDF_DOCUMENT()
const path = require('path')

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/form.html')
})
app.get("/novo", async function (req, res) {
    
    doc.pipe(fs.createWriteStream('exemplo.pdf'))

    doc.image('./logo.png', {
        fit: [450, 100],
        align: 'center',
        valign: 'center'
    })
    doc.text('\n\n')
    doc.fontSize(14)
    doc.fillColor('black')
    doc.text('DECLARAÇÃO DE RESIDÊNCIA', { align: 'center' })
    doc.fillColor('black')
    doc.text('\n\n\n\n')
    doc.text(`Eu, ${req.query.nome}, Brasileiro, portador do RG: ${req.query.rg} e do CPF: ${req.query.cpf}, residente e domiciliado nesta cidade de ${req.query.cidade}, por este instrumento infra-assinado e na melhor forma de direito, declaro para os devidos fins a quem interessar possa que, ${req.query.residente}, brasileiro, portador do RG ${req.query.Rrg} e do cpf ${req.query.Rcpf} é residente e domiciliada em imóvel de minha propriedade, cito á Rua ${req.query.rua} na qual reside há ${req.query.tempo}.`, { align: 'justify' })
    doc.text('\n\n\n')
    doc.text("Dato e assino a presente declaração para que se produzam os efeitos legais.", { align: 'left' })
    doc.text('\n\n')
    doc.text(`${req.query.cidade}-${req.query.estado}, ${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}.`)
    doc.text('\n\n\n\n\n\n\n')
    doc.text('_____________________________', { align: 'center' })
    doc.text(`${req.query.nome}`, { align: 'center' })
    doc.text(`CPF: ${req.query.cpf}`, { align: 'center' })
    doc.end()

    setTimeout(() => {
        res.sendFile(__dirname+"/exemplo.pdf")
    }, 2000);

})

app.listen(3500)
