package com.newsblog.rest;

import com.newsblog.model.Article;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/json")
public class JsonRESTService {

    @GET
    @Path("/getArticleList")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Article> getArticleList() {
        List<Article> articleList = new ArrayList<>();

        Article article1 = new Article();
        article1.setId(1);
        article1.setTitle("What if California seceded from the US?");
        article1.setAuthor("John Smith");
        article1.setDate("07.04.2018");
        article1.setType("politic");
        article1.setImg("images/2.jpg");

        Article article2 = new Article();
        article2.setId(2);
        article2.setTitle("About smart phones");
        article2.setAuthor("James Bond");
        article2.setDate("12.05.2018");
        article2.setType("other");
        article2.setImg("images/1.jpg");

        Article article3 = new Article();
        article3.setId(3);
        article3.setTitle("Chess Championship");
        article3.setAuthor("John Smith");
        article3.setDate("08.04.2018");
        article3.setType("sport");
        article3.setImg("images/3.jpg");

        Article article4 = new Article();
        article4.setId(4);
        article4.setTitle("Football");
        article4.setAuthor("John Smith");
        article4.setDate("08.04.2018");
        article4.setType("sport");
        article4.setImg("images/3.jpg");

        articleList.add(article1);
        articleList.add(article2);
        articleList.add(article3);
        articleList.add(article4);

        return articleList;
    }


    @POST
    @Path("/getArticleListByType")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Article> getArticleListByType (String type) {
        List<Article> articleList = new ArrayList<>();

        Article article1 = new Article();
        article1.setId(1);
        article1.setTitle("What if California seceded from the US?");
        article1.setAuthor("John Smith");
        article1.setDate("07.04.2018");
        article1.setType("politic");
        article1.setImg("images/2.jpg");

        Article article2 = new Article();
        article2.setId(2);
        article2.setTitle("About smart phones");
        article2.setAuthor("James Bond");
        article2.setDate("12.05.2018");
        article2.setType("other");
        article2.setImg("images/1.jpg");

        Article article3 = new Article();
        article3.setId(3);
        article3.setTitle("Chess Championship");
        article3.setAuthor("John Smith");
        article3.setDate("08.04.2018");
        article3.setType("sport");
        article3.setImg("images/3.jpg");

        Article article4 = new Article();
        article4.setId(4);
        article4.setTitle("Football");
        article4.setAuthor("John Smith");
        article4.setDate("08.04.2018");
        article4.setType("sport");
        article4.setImg("images/3.jpg");

        if (type.equals("sport")) {
            articleList.add(article3);
            articleList.add(article4);
        } else if (type.equals("politic")) {
            articleList.add(article1);
        } else {
            articleList.add(article2);
        }

        return articleList;
    }


    @POST
    @Path("/getArticleById")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    public Article getArticleById(int id) {
        Article article = new Article();

        if (id == 1) {
            article.setTitle("What if California seceded from the US?");
            article.setAuthor("John Smith");
            article.setDate("07.04.2018");
            article.setType("politic");
            article.setImg("images/2.jpg");
            article.setContent("Actor Geoffrey Rush has been awarded the largest ever defamation payout to a single person in Australia. The Oscar-winner was last month awarded A$2.9m (£1.57m; US$1.99m) after winning the case against Nationwide News, which publishes Australia's Daily Telegraph. The Sydney newspaper had published stories accusing him of behaving inappropriately towards former co-star Eryn Jean Norvill. Judge Michael Wigney found that Ms Norvill was \"prone to exaggeration\". Mr Rush has sought an injunction to prevent the Telegraph re-publishing accusations at the heart of the case. Nationwide News has appealed against an initial ruling in the case. The accusations detailed in the Telegraph article \"King Leer\" date back to a 2015 theatre production of King Lear in which Mr Rush acted alongside Ms Norvill. Mr Rush was awarded $850,000 in general and aggravated damages plus more than $1m for past economic loss, $919,678 in future economic loss and $42,000 in interest, the Australian Broadcasting Corporation reports. He was originally seeking more than $25m in damages. The judge called the reporting a \"recklessly irresponsible piece of sensationalist journalism of ... the very worst kind\", The Sydney Morning Herald reports. Mr Rush's barrister, Sue Chrysanthou, said the Telegraph had shown a \"complete lack of impartiality and lack of commercial sense\". Tom Blackburn, barrister for the newspaper, said Mr Rush was \"trying to shut down any criticism of the judgment\" and that the injunction on re-publishing allegations could have a chilling effect on coverage of the #MeToo movement. Actress Yael Stone also accused Mr Rush of behaving inappropriately towards her, an allegation he denies. The Telegraph had pushed to have Ms Stone's allegations admitted as evidence, however the judge blocked the move on the grounds it could have led to prejudice against Mr Rush. Actress Rebel Wilson was awarded a A$4.7m payout last year, but that sum was reduced to $600,000 on appeal. She sued magazine publisher Bauer Media over articles that she said had wrongly portrayed her as a serial liar, but an appeals court later found that \"there was no basis in the evidence for making any award of damages for economic loss.\"");
        } else if (id == 2) {
            article.setTitle("About smart phones");
            article.setAuthor("James Bond");
            article.setDate("12.05.2018");
            article.setType("other");
            article.setImg("images/1.jpg");
            article.setContent("The Oscar-winner was last month awarded A$2.9m (£1.57m; US$1.99m) after winning the case against Nationwide News, which publishes Australia's Daily Telegraph. The Sydney newspaper had published stories accusing him of behaving inappropriately towards former co-star Eryn Jean Norvill. Judge Michael Wigney found that Ms Norvill was \"prone to exaggeration\". Mr Rush has sought an injunction to prevent the Telegraph re-publishing accusations at the heart of the case. Nationwide News has appealed against an initial ruling in the case. The accusations detailed in the Telegraph article \"King Leer\" date back to a 2015 theatre production of King Lear in which Mr Rush acted alongside Ms Norvill. Mr Rush was awarded $850,000 in general and aggravated damages plus more than $1m for past economic loss, $919,678 in future economic loss and $42,000 in interest, the Australian Broadcasting Corporation reports. He was originally seeking more than $25m in damages. The judge called the reporting a \"recklessly irresponsible piece of sensationalist journalism of ... the very worst kind\", The Sydney Morning Herald reports. Mr Rush's barrister, Sue Chrysanthou, said the Telegraph had shown a \"complete lack of impartiality and lack of commercial sense\". Tom Blackburn, barrister for the newspaper, said Mr Rush was \"trying to shut down any criticism of the judgment\" and that the injunction on re-publishing allegations could have a chilling effect on coverage of the #MeToo movement. Actress Yael Stone also accused Mr Rush of behaving inappropriately towards her, an allegation he denies. The Telegraph had pushed to have Ms Stone's allegations admitted as evidence, however the judge blocked the move on the grounds it could have led to prejudice against Mr Rush. Actress Rebel Wilson was awarded a A$4.7m payout last year, but that sum was reduced to $600,000 on appeal. She sued magazine publisher Bauer Media over articles that she said had wrongly portrayed her as a serial liar, but an appeals court later found that \"there was no basis in the evidence for making any award of damages for economic loss.\"");
        } else {
            article.setTitle("Chess Championship");
            article.setAuthor("John Smith");
            article.setDate("08.04.2018");
            article.setType("sport");
            article.setImg("images/3.jpg");
            article.setContent("The Sydney newspaper had published stories accusing him of behaving inappropriately towards former co-star Eryn Jean Norvill. Judge Michael Wigney found that Ms Norvill was \"prone to exaggeration\". Mr Rush has sought an injunction to prevent the Telegraph re-publishing accusations at the heart of the case. Nationwide News has appealed against an initial ruling in the case. The accusations detailed in the Telegraph article \"King Leer\" date back to a 2015 theatre production of King Lear in which Mr Rush acted alongside Ms Norvill. Mr Rush was awarded $850,000 in general and aggravated damages plus more than $1m for past economic loss, $919,678 in future economic loss and $42,000 in interest, the Australian Broadcasting Corporation reports. He was originally seeking more than $25m in damages. The judge called the reporting a \"recklessly irresponsible piece of sensationalist journalism of ... the very worst kind\", The Sydney Morning Herald reports. Mr Rush's barrister, Sue Chrysanthou, said the Telegraph had shown a \"complete lack of impartiality and lack of commercial sense\". Tom Blackburn, barrister for the newspaper, said Mr Rush was \"trying to shut down any criticism of the judgment\" and that the injunction on re-publishing allegations could have a chilling effect on coverage of the #MeToo movement. Actress Yael Stone also accused Mr Rush of behaving inappropriately towards her, an allegation he denies. The Telegraph had pushed to have Ms Stone's allegations admitted as evidence, however the judge blocked the move on the grounds it could have led to prejudice against Mr Rush. Actress Rebel Wilson was awarded a A$4.7m payout last year, but that sum was reduced to $600,000 on appeal. She sued magazine publisher Bauer Media over articles that she said had wrongly portrayed her as a serial liar, but an appeals court later found that \"there was no basis in the evidence for making any award of damages for economic loss.\"");

        }

        return article;
    }
}
