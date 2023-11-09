import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Imagem from "./assets/imagem.png";
import { Link } from 'react-router-dom';
import Api from '../../services/Api';

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }

function Card() {

    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        const getnoticias = async () => {
            let res = await Api.noticias();
            console.log(res)

            let arrayNoticias = new Array();

            for(var i = 0; i < 10; i++){
                if(res.items[i]['editorias'].indexOf("economicas") != -1){

                    let img = res.items[i]['imagens'].split('":"')[1];
                    img = img.split('",')[0]
                    img = img.split("\/");
                    console.log(img);
                    let img2 = "";
                    for(var j = 0; j < img.length; j++){

                        if(j == 0){
                            img2 += img[j].replace('\\', "") + "/";
                        } else if(j < (img.length-1)){
                            img2 += img[j].replace("//", "").replace('\\', "") + "/";
                        } else {
                            img2 += img[j].replace("//", "");
                        }
                        
                    }
                    
                    console.log(img2);
                    
                    let temp = {
                        titulo: res.items[i]['titulo'], 
                        desc: res.items[i]['introducao'], 
                        img: "https://ibge.gov.br/" + img2, 
                        link: res.items[i]['link']
                    }

                    console.log(temp);
                    arrayNoticias.push(temp);
                    setNoticias(arrayNoticias);
                }
            }

            console.log(arrayNoticias);
        }

        getnoticias();
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 3840,
                settings: {
                    slidesToShow: 4,
                }
            },
        ]
      };
    return (
        <div className='container'>
          <span className='h2__texto'>Notícias Recentes</span>
          <Slider {...settings}>
            {noticias.map(({titulo, desc, img, link}) => 
                <a target='_BLANK' href={link}>
                    <div className='card card__fundo'>
                        <img src={img} alt='' className='w-100'/>
                        <div className='card-body'>
                            <h3>{titulo}</h3>
                            <p>{desc}</p>
                        </div>
                    </div>
                </a>
            )}
            </Slider>
            </div>
      );
    }

export default Card;

