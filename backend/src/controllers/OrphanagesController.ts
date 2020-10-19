//Para que entenda o que e Request e Response e necessaria a importacao com o express
import { Request, Response } from 'express';
//Para poder criar os dados no banco de dados
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view'; 
//Para validacoes
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';

export default {
  //Listando orfanatos
  async index(request: Request, response: Response){
    const orphanagesRepository = getRepository(Orphanage); 

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanageView.renderMany(orphanages)); 
  },

  //Listando detalhes do orfanato
  async show(request: Request, response: Response){
    //Pegando o id para passar para o find
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage); 

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanageView.render(orphanage)); 
  },


  //Criando um orfanato
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    //Para pegar o repositorio
    const orphanagesRepository = getRepository(Orphanage); 

    const requestImages = request.files as Express.Multer.File[];
    //Criando um metodo para recuperar imagens para serem criadas quando criar um orfanato
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    //Criando nossas validacoes 
    const schema = Yup.object().shape({
      name: Yup.string().required(), //Usando o Yup a validacao fica: Name e um string, e um campo obrigatiorio.
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300), //Usado o max para ter no maximo 300 caracteres
      instructions: Yup.string().required(), 
      opening_hours: Yup.string().required(), 
      open_on_weekends: Yup.boolean().required(), 
      images: Yup.array( //Imagem deve ser criada assim pois e um array com objetos 
        Yup.object().shape({ 
          path: Yup.string().required(),
        })
      )
    });
    
    //Para ser realizada de fato a validacao
    await schema.validate(data, { //Para encontrar todos os erros que tiver na validacao
      abortEarly: false,
    });

    //Pre-criacao dos dados   
    const orphanage = orphanagesRepository.create(data);

    //Criando no banco os dados 
    await orphanagesRepository.save(orphanage);


    return response.status(201).json(orphanage);

  }
};